from pathlib import Path

import click
import pandas as pd
from app.crud import t_recruit_games
from app.schemas.t_recruit_games import TRecruitGamesCreate
from app.db.session import SessionLocal



@click.command()
@click.argument("csv_dir", type=click.Path(exists=True), default=Path("./migrations/seeds"))
def seeds(csv_dir: Path):
    """Seed the database with data from a CSV file.

    Args:
        csv_dir (Path): Path to CSV file dir.
    """
    db = SessionLocal()
    for csv_path in csv_dir.glob("*.csv"):
        df = pd.read_csv(csv_path)
        # 共通処理
        df = df.where(pd.notnull(df), None)

        match csv_path.stem:
            case "t_recruit_games":
                df["password"] = df["password"].astype(str)
                for _, row in df.iterrows():
                    t_recruit_games.t_recruit_games.create(db, obj_in=TRecruitGamesCreate(**row.to_dict()))


if __name__ == "__main__":
    seeds()
