from typing import List

from pydantic import BaseModel
from Request import Facilitys


class ResponseBodyData(BaseModel):
    facilitys: List[Facilitys]
    description: str
