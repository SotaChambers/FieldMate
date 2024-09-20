default: help

.PHONY: init-repo
init-repo:
	poetry install

.PHONY: launch_api_server
launch_api_server:
	poetry run uvicorn app.main:app --reload

.PHONY: revision-db
revision-db:
	poetry run alembic revision --autogenerate

.PHONY: upgrade-db
upgrade-db:
	poetry run alembic upgrade head

.PHONY: downgrade-db
downgrade-db:
	poetry run alembic downgrade base

.PHONY: seed-db
seed-db:
	poetry run python migrations/seeds/base.py