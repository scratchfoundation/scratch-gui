ESLINT=./node_modules/.bin/eslint
NODE=node
WEBPACK=./node_modules/.bin/webpack --progress --colors
WEBPACK_DEV_SERVER=./node_modules/.bin/webpack-dev-server

# ------------------------------------------------------------------------------

build:
	@make clean
	$(WEBPACK) --bail

clean:
	rm -rf ./build
	mkdir -p build

watch:
	$(WEBPACK) --watch

serve:
	$(WEBPACK_DEV_SERVER) --port 8601 --content-base=./build

# ------------------------------------------------------------------------------

lint:
	$(ESLINT) .

test:
	@make lint
	@make build

.PHONY: build clean watch serve lint test
