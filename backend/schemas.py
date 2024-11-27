from typing import List

from pydantic import BaseModel


class Facilitys(BaseModel):
    """施設情報を格納するスキーマ

    Args:
        BaseModel (_type_): _description_
    """

    name: str
    latitude: float
    longitude: float


##### Entory Point : /api/datePlan


class MessageRequestBody(BaseModel):
    """メッセージを格納する

    Args:
        BaseModel (_type_): _description_
    """

    role: str
    message: str
    facilitys: List[Facilitys]
    description: str


class CurrentDatePlan(BaseModel):
    """デートプランを格納するスキーマ

    Args:
        BaseModel (_type_): _description_
    """

    facilitys: List[Facilitys]
    description: str
