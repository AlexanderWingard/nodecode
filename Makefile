OS=$(shell uname | tr A-Z a-z)
NODE=https://nodejs.org/dist/v6.11.0/node-v6.11.0-$(OS)-x64.tar.xz
YARN=https://yarnpkg.com/latest.tar.gz
ifeq ($(shell lsb_release -is), Ubuntu)
	MONGO=https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-ubuntu1604-3.4.5.tgz
else ifeq($(shell uname), Darwin)
	MONGO=https://fastdl.mongodb.org/osx/mongodb-osx-ssl-x86_64-3.4.6.tgz
else
	MONGO=https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-rhel62-3.4.5.tgz
endif
export PATH := $(shell pwd)/env/bin:$(shell pwd)/node_modules/.bin:$(PATH)
.PHONY: start install supervisor

start: node_modules/.bin/webpack-dev-server env/bin/mongod
	webpack-dev-server --open

node_modules/.bin/webpack-dev-server: env/bin/npm
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

./env/bin/mongod:
	cd env && curl -O $(MONGO) && tar -zxf `basename $(MONGO)` --strip 1
	mkdir -p data/db
