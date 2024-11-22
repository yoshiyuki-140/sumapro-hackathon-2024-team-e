from pydantic import BaseModel
from typing import List

class facilitys(BaseModel):
    name: str
    latitude: int
    longitude: int

class RequestBodyData(BaseModel):
    role: str
    massege: str
    facilitys: List[facilitys]
    description: str