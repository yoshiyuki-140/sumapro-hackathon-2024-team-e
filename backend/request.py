from typing import List, Optional

from pydantic import BaseModel


class Facilitys(BaseModel):
    """
    MessageRequestBodyクラスのfacilitysに場所の名前、緯度経度をはめ込むデータモデル
    """

    name: str
    latitude: Optional[float]
    longitude: Optional[float]


class MessageRequestBody(BaseModel):
    """
    デートプラン情報をリクエストするデータモデル
    """

    role: str
    message: str
    facilitys: List[Facilitys]
    description: str


class PlanRequestBody(BaseModel):
    """
    デートの中で訪れる場所周辺の休憩スポットをリクエストするデータモデル
    """

    name: str
    latitude: float
    longitude: float
