from typing import List, Optional

from pydantic import BaseModel


class Facilitys(BaseModel):
    name: str
    latitude: Optional[float]
    longitude: Optional[float]


class MessageData(BaseModel):
    role: str
    message: str
    facilitys: List[Facilitys]
    description: str
