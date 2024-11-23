from dotenv import load_dotenv
from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()


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


class datePlanRequestBody(BaseModel):
    """
    今までの会話履歴を送信するためのスキーマ
    """

    List[ChatLog]


class datePlanReqponseBody(BaseModel):
    """"""

    facilitys: List[Facility]
    description: str


@app.post("/api/datePlan", response_model=datePlanReqponseBody)
def apiDatePlan(data: List[ChatLog]):
    pass
