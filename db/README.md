## DB の起動方法

データベースを起動するコマンド

```
docker-compose up -d
```

```
docker exec -it mysql bash
mysql -u root -p
> root
USE demo;
SHOW tables;

SELECT * FROM t_recruit_games;

DROP TABLE alembic_version;
```
