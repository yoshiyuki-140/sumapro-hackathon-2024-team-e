from typing import List

import schemas
from fastapi import Body, FastAPI
from starlette.middleware.cors import CORSMiddleware

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


@app.post(
    "/api/datePlan/restArea", response_model=schemas.apiDatePlanRestAreaResponseBody
)
def post_apiDatePlanRestArea(restAreas: schemas.apiDatePlanRestAreaRequestBody):
    """最寄りのトイレ・カフェ・コンビニの情報を返却する"""
    return {
        "cafe": {"name": "スタバ", "latitude": 0, "longitude": 0},
        "toilet": {"name": "公衆トイレ", "latitude": 0, "longitude": 0},
        "convenienceStore": {
            "name": "ファミリーマート0号",
            "latitude": 0,
            "longitude": 0,
        },
    }
