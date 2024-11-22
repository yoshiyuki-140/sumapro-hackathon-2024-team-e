from pydantic import BaseModel
from typing import List
from backend.Request import facilitys

class ResponseBodyData(BaseModel):
    facilitys:List[facilitys]
    description: str