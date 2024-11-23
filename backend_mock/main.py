from typing import List
from time import sleep

from fastapi import FastAPI, Body
from starlette.middleware.cors import CORSMiddleware

import schemas

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/datePlan", response_model=schemas.datePlanResponseBody)
def apiDatePlan(chatlogs: List[schemas.ChatLog] = Body(...)):
    """chat画面のAPIモック

    Args:
        chatlogs (List[ChatLog]): _description_

    Returns:
        _type_: _description_
    """
    # wait 1 second
    # sleep(1)

    # show log
    print(chatlogs)

    # create dummy data
    dummy_data = [
        {"name": "string1", "latitude": 0, "longitude": 0},
        {"name": "string2", "latitude": 0, "longitude": 0},
    ]

    # return response of json data
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
