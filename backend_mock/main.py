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
        {
            "name": "兼六園",
            "latitude": 36.56226565256541,
            "longitude": 136.66258712337654,
        },
        {
            "name": "21世紀美術館",
            "latitude": 36.56102676055879,
            "longitude": 136.6584872199715,
        },
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
