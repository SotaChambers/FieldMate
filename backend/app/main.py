from fastapi import FastAPI
from typing import Optional
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from fastapi import APIRouter, Depends
from app.api import deps
from sqlalchemy.orm import Session
from app.crud.t_recruit_games import t_recruit_games
from fastapi import HTTPException
from app.schemas.t_recruit_games import TRecruitGamesCreate, TRecruitGamesUpdate, TRecruitGamesBase
from app.schemas.received_recruit_games import ReceivedRecruitGamesBase
import random
from app.models.t_recruit_games import TRecruitGames


# FastAPIインスタンスを作成
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # 全てのHTTPメソッドを許可
    allow_headers=["*"],  # 全てのHTTPヘッダーを許可
)

# POSTエンドポイントを作成して、フォームデータを受け取る
@app.post("/submit")
async def submit_recruit_data(data: ReceivedRecruitGamesBase, db: Session = Depends(deps.get_db)):
    print("Received data:", data)
    # dbにない数字をidとして追加する
    while True:
        unique_id = str(random.randint(1000000, 9999999))
        if not t_recruit_games.check_receipt_id_exists(db, unique_id):
            break
    print("Unique ID:", unique_id)
    data = data.dict()
    data["id"] = unique_id
    
    t_recruit_games.create(db, obj_in=TRecruitGamesCreate(**data))
    # ここでデータベースへの保存処理を追加することができます
    return {"message": "Data received successfully", "data": data}


@app.get("/games", response_model=list[TRecruitGamesBase])
def get_games(db: Session = Depends(deps.get_db)):
    results = t_recruit_games.get_all(db)
    return [
        {
            "id": result.id,
            "date": result.date,
            "time": result.time,
            "prefecture": result.prefecture,
            "team_name": result.team_name,
            "contact": result.contact,
            "ground_name": result.ground_name,
            "profile": result.profile,
            "fee": result.fee,
            "level": result.level,
            "password": result.password,
            "comment": result.comment
        }
        for result in results
    ]


@app.put("/update/{id}")
async def update_game(id: int, data: TRecruitGamesBase, db: Session = Depends(deps.get_db)):
    # データベースから対象レコードを取得
    game = db.query(TRecruitGames).filter(TRecruitGames.id == id).first()
    
    if not game:
        raise HTTPException(status_code=404, detail="ゲームが見つかりません")

    # パスワードの照合
    if game.password != data.password:
        raise HTTPException(status_code=403, detail="パスワードが正しくありません")

    # データの更新
    game.date = data.date
    game.time = data.time
    game.prefecture = data.prefecture
    game.team_name = data.team_name
    game.contact = data.contact
    game.ground_name = data.ground_name
    game.profile = data.profile
    game.fee = data.fee
    game.level = data.level
    game.comment = data.comment
    
    # 変更をデータベースにコミット
    db.commit()
    db.refresh(game)

    return {"message": "データが正常に更新されました", "game": game}


@app.delete("/delete/{game_id}")
async def delete_game(game_id: int, password: str, db: Session = Depends(deps.get_db)):
    game = db.query(TRecruitGames).filter(TRecruitGames.id == game_id).first()
    
    if not game:
        raise HTTPException(status_code=404, detail="ゲームが見つかりません")
    
    if game.password != password:
        raise HTTPException(status_code=403, detail="パスワードが一致しません")
    
    db.delete(game)
    db.commit()
    
    return {"message": "削除に成功しました"}


# サーバーを起動するためのエントリーポイント
if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
