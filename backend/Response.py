from typing import List

from pydantic import BaseModel

from request import Facilitys


class MessageResponseBody(BaseModel):
    facilitys: List[Facilitys]
    description: str


#class RestAreaResponseBody(BaseModel):
    #cafe: RestAreaResponseBody
