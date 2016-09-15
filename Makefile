ESLINT=./node_modules/.bin/eslint
NODE=node
WEBPACK=./node_modules/.bin/webpack --progress --colors
WEBPACK_DEV_SERVER=./node_modules/.bin/webpack-dev-server

# ------------------------------------------------------------------------------

build:
	$(WEBPACK)

watch:
	$(WEBPACK) --watch

serve:
	$(WEBPACK_DEV_SERVER) --port 8601 --config playground.config.js

# ------------------------------------------------------------------------------

lint:
	$(ESLINT) . --ext .js,.jsx

test:
	@make lint
	@make build

.PHONY: build watch serve lint
