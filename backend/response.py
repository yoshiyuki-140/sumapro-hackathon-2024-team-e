from typing import List

from pydantic import BaseModel
from request import Facilitys


class MessageResponseBody(BaseModel):
    """
    対話内容からデートプラン情報を返却するするためのデータモデル
    """

    facilitys: List[Facilitys]
    description: str


class PlanResponseBody(BaseModel):
    """
    デートの中で訪れる場所周辺の休憩スポットを返却するためのデータモデル
    """

    cafe: Facilitys
    toilet: Facilitys
    convenienceStore: Facilitys
