from sqlalchemy import BigInteger, Column, DateTime, Identity, String

from app.db.base_class import Base


class TRecruitGames(Base):
    id = Column(BigInteger, Identity(), primary_key=True, nullable=False)
    date = Column(String(255), nullable=False)
    time = Column(String(255), nullable=False)
    prefecture = Column(String(255), nullable=False)
    team_name = Column(String(255), nullable=False)
    contact = Column(String(255), nullable=False)
    ground_name = Column(String(255), nullable=False)
    profile = Column(String(255), nullable=True)
    fee = Column(BigInteger, nullable=False)
    level = Column(BigInteger, nullable=False)
    password = Column(String(255), nullable=False)
    comment = Column(String(255), nullable=True)
