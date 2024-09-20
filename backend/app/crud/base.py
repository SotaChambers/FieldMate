"""CRUD操作のベースクラスモジュール

以下のコード参照
https://github.com/tiangolo/full-stack-fastapi-postgresql/blob/master/%7B%7Bcookiecutter.project_slug%7D%7D/backend/app/app/crud/base.py
"""

from typing import Any, Dict, Generic, Optional, Type, TypeVar, Union

from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.base_class import Base

ModelType = TypeVar("ModelType", bound=Base)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class CRUDBase(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """CRUD操作のベースクラス"""

    def __init__(self, model: Type[ModelType]):
        """
        CRUD object with default methods to Create, Read, Update, Delete (CRUD).
        **Parameters**
        * `model`: A SQLAlchemy model class
        * `schema`: A Pydantic model (schema) class
        """
        self.model = model

    def get(self, db: Session, id: Any) -> Optional[ModelType]:
        """データを取得するRead関数

        Args:
            db (Session): DB
            id (Any): ID

        Returns:
            Optional[ModelType]: データ
        """
        return db.query(self.model).get(id)

    def get_all(self, db: Session) -> list[ModelType]:
        """全てのデータを取得するRead関数

        Args:
            db (Session): DBセッション

        Returns:
            List[ModelType]: 全てのデータ
        """
        return db.query(self.model).all()

    def get_multi(self, db: Session, *, skip: int = 0, limit: int = 100) -> list[ModelType]:
        """複数データを取得するRead関数

        Args:
            db (Session): DB
            skip (int, optional): Skip. Defaults to 0.
            limit (int, optional): Limit. Defaults to 100.

        Returns:
            list[ModelType]: 複数データ
        """
        return db.query(self.model).offset(skip).limit(limit).all()

    def create(self, db: Session, *, obj_in: CreateSchemaType) -> ModelType:
        """データを挿入するCreate関数

        Args:
            db (Session): DB
            obj_in (CreateSchemaType): 挿入するデータ

        Returns:
            ModelType: 挿入したデータ
        """
        obj_in_data = jsonable_encoder(obj_in)
        db_obj = self.model(**obj_in_data)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: ModelType,
        obj_in: Union[UpdateSchemaType, Dict[str, Any]],
    ) -> ModelType:
        """データを更新するUpdate関数

        Args:
            db (Session): DB
            db_obj (ModelType): 元のデータ
            obj_in (Union[UpdateSchemaType, Dict[str, Any]]): 更新するデータ

        Returns:
            ModelType: 更新したデータ
        """
        obj_data = jsonable_encoder(db_obj)
        if isinstance(obj_in, dict):
            update_data = obj_in
        else:
            update_data = obj_in.dict(exclude_unset=True)
        for field in obj_data:
            if field in update_data:
                setattr(db_obj, field, update_data[field])
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove(self, db: Session, *, id: int) -> None:
        """データを削除するDelete関数

        Args:
            db (Session): DB
            id (int): ID
        """
        obj = db.query(self.model).get(id)
        db.delete(obj)
        db.commit()
