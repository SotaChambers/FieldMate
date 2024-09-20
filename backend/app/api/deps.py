"""DBのセッションを渡すためのモジュール(DBスクリプトの作成が終わったら追記予定)"""
from typing import Generator

from app.db.session import SessionLocal


def get_db() -> Generator:
    """セッションを取得するための関数

    Yields:
        Generator: dbのセッション
    """
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()
