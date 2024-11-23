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


class datePlanReqponseBody(BaseModel):
    """"""

    facilitys: List[Facility]
    description: str


@app.post("/api/datePlan", response_model=datePlanReqponseBody)
def apiDatePlan(chatlogs: List[ChatLog]):
    """chat画面のAPIモック

    Args:
        chatlogs (List[ChatLog]): _description_

    Returns:
        _type_: _description_
    """
    dummy_data = [
        {"name": "string1", "latitude": 0, "longitude": 0},
        {"name": "string2", "latitude": 0, "longitude": 0},
    ]
    return {
        "facilitys": [
            {
                "name": data["name"],
                "latitude": data["latitude"],
                "longitude": data["longitude"],
            }
            for data in dummy_data
        ],
        "description": "これはテストです",
    }
