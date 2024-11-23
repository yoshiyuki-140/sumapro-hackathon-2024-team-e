from pydantic import BaseModel


class Facility(BaseModel):
    """
    施設名
    緯度
    経度
    """

    name: str
    latitude: int
    longitude: int


class ChatLog(BaseModel):
    """
    チャット履歴
    """

    role: str
    message: str
    facilitys: List[Facility]
    description: str
    pass


class datePlanReqponseBody(BaseModel):
    """"""

    facilitys: List[Facility]
    description: str
