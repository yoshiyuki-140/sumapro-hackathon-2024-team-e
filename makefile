.PHONY: kill

kill:
	lsof -ti:3000,8000 | xargs kill -9