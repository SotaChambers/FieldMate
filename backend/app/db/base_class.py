import re

from sqlalchemy.orm import as_declarative, declared_attr


@as_declarative()
class Base:
    __name__: str

    @declared_attr.directive
    def __tablename__(cls) -> str:
        return re.sub(r"(?<!^)(?=[A-Z])", "_", cls.__name__).lower()
