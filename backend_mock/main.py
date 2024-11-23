from fastapi import FastAPI
from typing import List
import schemas

app = FastAPI()


@app.post("/api/datePlan", response_model=schemas.datePlanReqponseBody)
def apiDatePlan(chatlogs: List[schemas.ChatLog]):
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
