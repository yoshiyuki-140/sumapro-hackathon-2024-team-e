from typing import List

from pydantic import BaseModel


class Facilitys(BaseModel):
    name: str
    # latitude: int
    # longitude: int


class RequestBodyData(BaseModel):
    role: str
    message: str
    facilitys: List[Facilitys]
    description: str
