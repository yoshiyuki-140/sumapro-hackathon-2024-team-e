from typing import List

from pydantic import BaseModel


class Facility(BaseModel):
    """
    施設名
    緯度
    経度
    """

    name: str
    latitude: float
    longitude: float


class ChatLog(BaseModel):
    """
    チャット履歴
    """

    role: str
    message: str
    facilitys: List[Facility]
    description: str


class datePlanResponseBody(BaseModel):
    """"""

    facilitys: List[Facility]
    description: str

