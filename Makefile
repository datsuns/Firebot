.PHONY: setup build start clean secrets

setup:
	npm run setup

build:
	npm run build

start:
	npm start

clean:
	npx grunt cleanup

secrets:
	cp src/secrets.template.json src/secrets.json
