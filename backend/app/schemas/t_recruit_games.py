from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TRecruitGamesBase(BaseModel):
    """共有クラス"""
    id: int
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


class TRecruitGamesCreate(TRecruitGamesBase):
    """データをインサートする際のクラス"""


class TRecruitGamesUpdate(TRecruitGamesBase):
    """データをアップデートする際のクラス"""