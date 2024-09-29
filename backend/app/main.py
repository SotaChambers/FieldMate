from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional
import boto3
from datetime import datetime

# AWS Cognitoクライアントを作成
cognito_client = boto3.client(
    'cognito-idp',
    region_name='ap-northeast-1',
)


class RequestRecruit(BaseModel):
    owner_id: str
    date: str
    time: str
    prefecture: str
    place: str
    price: int
    level: int
    comment: str

class RequestUpdateRecruit(BaseModel):
    id: int  # id フィールドを追加
    date: str
    time: str
    prefecture: str
    place: str
    price: int
    level: int
    comment: str

class RequestGameComment(BaseModel):
    game_id: int
    user_id: str
    comment: str

class RequestApplyGame(BaseModel):
    game_id: int
    user_id: str


class RequestApproveGame(BaseModel):
    apply_user_id: str

# FastAPIインスタンスを作成
app = FastAPI()

# CORS設定を追加（フロントエンドのオリジンを許可）
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # フロントエンドのオリジンを許可
    allow_credentials=True,
    allow_methods=["*"],  # 全てのHTTPメソッドを許可
    allow_headers=["*"],  # 全てのHTTPヘッダーを許可
)

# サンプルの試合データ
games = [
    {
        "id": 1,
        "post_at": "2024-08-30 12:00",
        "owner_id": "5774ca88-7061-70d3-c86d-78832bd9fda6",
        "date": "2024-09-30",
        "time": "14:00",
        "prefecture": "東京都",
        "place": "新宿スポーツセンター",
        "price": 2000,
        "level": 3,
        "comment": "初心者歓迎です",
        "opponent_id": None,
        "match_flag": False
    },
    {
        "id": 2,
        "post_at": "2024-08-30 12:00",
        "owner_id": "5774ca88-7061-70d3-c86d-78832bd9fda6",
        "date": "2024-10-05",
        "time": "10:00",
        "prefecture": "大阪府",
        "place": "大阪市立体育館",
        "price": 1500,
        "level": 2,
        "comment": "中級者向けです",
        "opponent_id": None,
        "match_flag": False
    }
]

game_logs = [
    {
        "id": 1,
        "game_recruit_id": 1,
        "user_id": "5774ca88-7061-70d3-c86d-78832bd9fda6",
        "post_at": "2024-08-30 12:00",
        "comment": "参加募集中です"
    },
    {
        "id": 2,
        "game_recruit_id": 1,
        "user_id": "5774ca88-7061-70d3-c86d-78832bd9fda6",
        "post_at": "2024-08-31 12:00",
        "comment": "まだ参加募集中です。ぜひ検討ください。ちなみに私は当日いませんが、別のものが参加予定です"
    },
    {
        "id": 3,
        "game_recruit_id": 1,
        "user_id": "5774ca88-7061-70d3-c86d-78832bd9fda6",
        "post_at": "2024-08-31 11:00",
        "comment": "まだ参加募集中です"
    },
    {
        "id": 4,
        "game_recruit_id": 1,
        "user_id": "d7b46a48-f0a1-705b-47ef-7a30fd4db225",
        "post_at": "2024-08-31 14:00",
        "comment": "応募したいです"
    }
]

game_apply_log = [
    {
        "id": 1,
        "apply_date": "2024-08-30 12:00",
        "game_id": 1,
        "apply_user_id": "d7b46a48-f0a1-705b-47ef-7a30fd4db225",
        "match_flag": False,
    }
]

# POSTリクエストを処理するエンドポイント
@app.post("/recruit")
async def submit_form(data: RequestRecruit):
    # 送られたデータをコンソールに出力
    print("Received data:", data)
    new_game = {
        "id": len(games) + 1,
        "owner_id": data.owner_id,
        "date": data.date,
        "time": data.time,
        "prefecture": data.prefecture,
        "place": data.place,
        "price": data.price,
        "level": data.level,
        "comment": data.comment
    }
    games.append(new_game)

    # レスポンスとして成功メッセージを返す
    return {"message": "Form data received successfully", "data": data.dict()}

# POSTリクエストを処理するエンドポイント
@app.get("/games")
async def get_games():
    return games

# 特定のIDの試合詳細を返すエンドポイント
@app.get("/get_detail_game/{game_id}")
async def get_detail_game(game_id: int):
    print(games)
    # gamesとgame_logsからidが一致するデータを取得
    game = next((game for game in games if game["id"] == game_id), None)
    print(game)
    game["username"] = await get_username_from_cognito(game["owner_id"])
    if not game:
        raise HTTPException(status_code=404, detail="Game not found")
    
    game_log = [log for log in game_logs if log["game_recruit_id"] == game_id]

    # 各game_logのuser_idからusernameを取得
    for log in game_log:
        log["username"] = await get_username_from_cognito(log["user_id"])

    return {"game": game, "game_log": game_log}

async def get_username_from_cognito(user_id: str):
    print("ユーザーID", user_id)
    response = cognito_client.list_users(
        UserPoolId="ap-northeast-1_GanXNos9l",
        Filter=f"sub = '{user_id}'"
    )
    print("レスピンス", response)
    return response["Users"][0]["Username"]

@app.post("/submit_game_comment")
async def submit_game_comment(data: RequestGameComment):
    new_log = {
        "id": len(game_logs) + 1,
        "game_recruit_id": data.game_id,
        "user_id": data.user_id,
        "post_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "comment": data.comment,
    }
    
    # Cognitoからユーザー名を取得
    username = await get_username_from_cognito(data.user_id)
    new_log["username"] = username

    print("New log with username:", new_log)

    return {"message": "Comment submitted successfully", "data": new_log}

@app.get("/game_logs")
async def get_game_logs():
    return game_logs

@app.get("/apply_game_logs")
async def get_apply_game_logs():
    for log in game_apply_log:
        log["username"] = await get_username_from_cognito(log["apply_user_id"])
        print(game_apply_log)
    return game_apply_log

@app.post("/apply_game")
async def apply_game(data: RequestApplyGame):
    print("応募", data)
    new_apply_log = {
        "id": len(game_apply_log) + 1,
        "apply_date": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "game_id": data.game_id,
        "apply_user_id": data.user_id,
        "match_flag": False,
    }
    game_apply_log.append(new_apply_log)
    print(game_apply_log)
    return {"apply_logs": game_apply_log}


@app.post("/update_game")
async def update_game(data: RequestUpdateRecruit):
    print("変更", data)

@app.post("/approve_game")
async def approve_game(data: RequestApproveGame):
    print("応募", data)
    for log in game_apply_log:
        if log["apply_user_id"] == data.apply_user_id:
            log["match_flag"] = True
            break
    
    print(game_apply_log)
