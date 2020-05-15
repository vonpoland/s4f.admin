# Description
Admin panel that allowos to manager live interactions on any screens.

## Prequestites
Nodejs 6.x

## Install
`npm install`
`npm run jspm install`

## Run
`NODE_ENV=development node app`

## Demo:

https://admin.hooper.pl/login
user: test@s4f.pl
pass: test

![demo](https://raw.githubusercontent.com/vonpoland/s4f.admin/master/public/img/demo1.png)



## How to run browser sync?
`gulp browser-sync`

## Run tests
`gulp test:unit:backend`
`gulp test:unit:frontend:dev`

## Run e2e test with spec
`protractor test\e2e\conf.js --suite editInteraction`
