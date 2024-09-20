## 対応表

| Front/Backend | Python 環境    |
| ------------- | -------------- |
| yarn          | poetry         |
| package.json  | pyproject.toml |
| node_modgule  | venv           |
| npm           | pip            |
| nodejs        | python         |

## 環境構築

frontend, backend の docker 環境はまだない

```bash
docker-compose -f db/docker-compose.yml up -d
npx create-react-app frontend
```

## Pre-Commit の設定

```bash
yarn install
```

```mermaid
erDiagram
    members {
        int id PK
        string username
        datetime register_datetime
        int team_id FK
        string email
        string password
    }

    teams {
        int id PK
        string team_name
        string team_info
    }

    games_recruit {
        int id PK
        datetime post_at
        int owner_id FK
        date game_date
        time game_time
        string prefecture
        string place
        string level
        string comment
        int opponent_id FK
        boolean match_flag
    }

    games_evaluate {
        int id PK
        int recruit_id FK
        int evaluate_user_id FK
        int evaluated_user_id FK
        int evaluate
        string comment
        string result
    }

    log_recruit_games {
        int id PK
        int game_recruit_id FK
        int user_id FK
        datetime post_at
        string comment
    }

    members ||--o{ teams: "belongs to"
    members ||--o{ games_recruit: "posted"
    members ||--o{ games_evaluate: "evaluates"
    games_recruit ||--o{ games_evaluate: "related to"
    games_recruit ||--o{ log_recruit_games: "logged"
    members ||--o{ log_recruit_games: "logs"


```

-   [ ] ログイン機能の実装
-   [ ]
