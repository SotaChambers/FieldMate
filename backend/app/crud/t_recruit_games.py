from app.crud.base import CRUDBase
from app.models.t_recruit_games import TRecruitGames
from app.schemas.t_recruit_games import TRecruitGamesCreate, TRecruitGamesUpdate
from sqlalchemy.orm import Session


class CRUDTRecruitGames(CRUDBase[TRecruitGames, TRecruitGamesCreate, TRecruitGamesUpdate]):
    """リサイクル状況DBのCRUD"""

    def check_receipt_id_exists(self, db: Session, id: int) -> bool:
        """IDが存在するかどうかを確認する

        Args:
            db (Session): DB Session
            id (str): ID

        Returns:
            bool: IDが存在するかどうか
        """
        return db.query(self.model).filter(self.model.id == id).first() is not None

t_recruit_games = CRUDTRecruitGames(TRecruitGames)
