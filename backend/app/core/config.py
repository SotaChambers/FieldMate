from typing import List, Literal

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

load_dotenv(".env")
load_dotenv(".env.local", override=True)


class Settings(BaseSettings):
    """envファイルをPythonで扱うためのクラス

    Args:
        PROJECT_NAME (str): プロジェクト名
        BACKEND_CORS_ORIGINS (str):
        API_V1_STR (str): APIのベースのパス
    """
    MYSQL_USER: str
    MYSQL_PASSWORD: str
    MYSQL_HOSTNAME: str
    MYSQL_PORT: str

    @property
    def SQLALCHEMY_DATABASE_URI(self) -> str:
        return f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}@{self.MYSQL_HOSTNAME}:{self.MYSQL_PORT}/demo"

    class Config:
        """
        case_sensitive: 大文字小文字を区別するかどうか
        """

        case_sensitive = True
        env_file = ".env"


settings = Settings()  # type: ignore
