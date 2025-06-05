.PHONY: setup build start clean

setup:
	npm run setup

build:
	npm run build

start:
	npm start

clean:
	npx grunt cleanup
