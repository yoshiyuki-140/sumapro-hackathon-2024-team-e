.PHONY: f init run

init:
	pip install -r requirements.txt

# フォーマッター
f:
	autoflake --remove-all-unused-imports -r --in-place . --exclude=venv
	black .
	isort .

run:
	uvicorn main:app --reload
