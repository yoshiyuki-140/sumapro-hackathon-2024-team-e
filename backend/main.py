from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class facilitys(BaseModel):
    name: str
    latitude: int
    longitude: int


class RequestBodyData(BaseModel):
    role: str
    massege: str
    facilitys: List[facilitys]
    description: str

