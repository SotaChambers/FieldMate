from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ReceivedRecruitGamesBase(BaseModel):
    """共有クラス"""
    date: str
    time: str
    prefecture: str
    team_name: str
    contact: str
    ground_name: str
    profile: Optional[str]
    fee: int
    level: int
    password: str
    comment: Optional[str]