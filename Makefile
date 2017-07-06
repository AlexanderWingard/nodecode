NODE=https://nodejs.org/dist/v6.11.0/node-v6.11.0-linux-x64.tar.xz
export PATH := $(shell pwd)/env/bin:$(PATH)
export PATH := $(shell npm bin):$(PATH)
.PHONY: start install supervisor

start: env/bin/npm
	npm start

install: env/bin/npm
	npm install

supervisor: env/bin/npm
	supervisor server.js

env/bin/npm:
	mkdir -p env && \
	cd env && \
	curl -O $(NODE) && \
	tar xf `basename $(NODE)` --strip 1
