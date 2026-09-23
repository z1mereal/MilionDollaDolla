from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, EmailStr
from typing import List
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI()
api_router = APIRouter(prefix="/api")

IMG = "https://images.unsplash.com/{}?q=80&w=1200&auto=format&fit=crop"

PRODUCTS = [
    {
        "slug": "district-trio", "name": "District Trio", "series": "SERIES 01",
        "edition": "#001 / 500", "price": 89, "category": "OPERATIVE", "status": "IN STOCK",
        "image": IMG.format("photo-1638977229486-688c2435a1b1"),
        "description": "Three wardens of the old district, issued as a single unit. Cap, coat and chain — reduced to grey, still unmistakably themselves.",
        "articulation": 18, "height": "4.0 CM",
    },
    {
        "slug": "arctic-scout", "name": "Arctic Scout", "series": "SERIES 01",
        "edition": "#002 / 500", "price": 64, "category": "OPERATIVE", "status": "IN STOCK",
        "image": IMG.format("photo-1619431843897-4676bff0c286"),
        "description": "A reconnaissance unit rendered in ice-white ABS. De-saturated to the archive standard; the silhouette does all the talking.",
        "articulation": 22, "height": "4.0 CM",
    },
    {
        "slug": "void-walker", "name": "Void Walker", "series": "SERIES 01",
        "edition": "#003 / 500", "price": 120, "category": "VANGUARD", "status": "LOW STOCK",
        "image": IMG.format("photo-1538448174498-9956c159edb0"),
        "description": "The archive's signature piece. A caped silhouette photographed against raw white mineral — equal parts relic and warning.",
        "articulation": 28, "height": "4.5 CM",
    },
    {
        "slug": "mono-pilot", "name": "Mono Pilot", "series": "SERIES 01",
        "edition": "#004 / 500", "price": 72, "category": "OPERATIVE", "status": "IN STOCK",
        "image": IMG.format("photo-1560167016-022b78a0258e"),
        "description": "Flight-certified, depth-of-field approved. The Mono Pilot ships with a removable helmet and an unhealthy obsession with altitude.",
        "articulation": 24, "height": "4.0 CM",
    },
    {
        "slug": "citadel-keeper", "name": "Citadel Keeper", "series": "SERIES 01",
        "edition": "#005 / 500", "price": 58, "category": "ARTIFACT", "status": "IN STOCK",
        "image": IMG.format("photo-1641748182993-6d81437850e6"),
        "description": "Keeper of the gate. A heritage sculpt reissued in archive monochrome — the oldest mold in the collection, unchanged since 1978.",
        "articulation": 18, "height": "4.0 CM",
    },
    {
        "slug": "crimson-unit-07", "name": "Crimson Unit 07", "series": "SERIES 01",
        "edition": "#006 / 500", "price": 95, "category": "VANGUARD", "status": "ARCHIVE ONLY",
        "image": IMG.format("photo-1525355198643-193cd25842ae"),
        "description": "Withdrawn from general sale. Unit 07 exists now only in the vault — viewable, not acquirable, until Series 02.",
        "articulation": 26, "height": "4.0 CM",
    },
    {
        "slug": "lounge-protocol", "name": "Lounge Protocol", "series": "SERIES 01",
        "edition": "#007 / 500", "price": 110, "category": "ARTIFACT", "status": "LOW STOCK",
        "image": IMG.format("photo-1590341328520-63256eb32bc3"),
        "description": "Seated, unbothered, permanently off duty. Ships with a single molded chair in archive red, photographed here in grayscale discipline.",
        "articulation": 20, "height": "4.0 CM",
    },
    {
        "slug": "duality-set", "name": "Duality Set", "series": "SERIES 01",
        "edition": "#008 / 500", "price": 140, "category": "OPERATIVE", "status": "IN STOCK",
        "image": IMG.format("photo-1526505262320-81542978f63b"),
        "description": "Two figures, one balloon, zero color. The only paired release in the archive — sold together, displayed together, forever.",
        "articulation": 22, "height": "4.0 CM",
    },
]


class Product(BaseModel):
    slug: str
    name: str
    series: str
    edition: str
    price: int
    category: str
    status: str
    image: str
    description: str
    articulation: int
    height: str


class NewsletterIn(BaseModel):
    email: EmailStr


@api_router.get("/")
async def root():
    return {"message": "MINIFIG // ARCHIVE API"}


@api_router.get("/products", response_model=List[Product])
async def get_products():
    return await db.products.find({}, {"_id": 0}).to_list(100)


@api_router.post("/newsletter")
async def subscribe(input: NewsletterIn):
    email = input.email.lower()
    existing = await db.newsletter.find_one({"email": email})
    if existing:
        return {"status": "already_subscribed"}
    await db.newsletter.insert_one({
        "email": email,
        "subscribed_at": datetime.now(timezone.utc).isoformat(),
    })
    return {"status": "subscribed"}


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def seed_products():
    if await db.products.count_documents({}) == 0:
        await db.products.insert_many([dict(p) for p in PRODUCTS])
        logger.info("Seeded %s products", len(PRODUCTS))


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
