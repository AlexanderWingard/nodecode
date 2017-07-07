OS=$(shell uname | tr A-Z a-z)
NODE=https://nodejs.org/dist/v6.11.0/node-v6.11.0-$(OS)-x64.tar.xz
YARN=https://yarnpkg.com/latest.tar.gz
export PATH := $(shell pwd)/env/bin:$(shell env/bin/npm bin):$(PATH)
.PHONY: start install supervisor

start: env/bin/npm
	webpack-dev-server --open

install: env/bin/npm
	npm install

supervisor: env/bin/npm
	supervisor server.js

env/bin/npm:
	mkdir -p env && \
	cd env && \
	curl -O $(NODE) && \
	tar xf `basename $(NODE)` --strip 1

env/bin/yarn:
	mkdir -p env && \
	cd env && \
	curl -L $(YARN) | tar xvz --strip 1
