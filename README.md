# zappy-app

Zappy integrates with a Slack channel and
listens on specific messages. For simplicity, we the tool will listen on all messages containing the word
“go”. As soon as any member of the marketing team, places a messages on a channel containing the
message “go”, the tool fetches twitter feeds from the FictionFone account and saves in a mongo
collection.

# Getting started
1. Go to the root directory and run:
 ```sh
 docker-compose up --build -d
 ```
2. app will be running on port 4200 and api runs on port 9200
3. Once you add tweet on twitter then hit text containing the word ```go```, 
the app will be updated and list tweets without hard reload or any other action
 
# Project structure
- This app project is generated with [ngX-Rocket](https://github.com/ngx-rocket/generator-ngx-rocket/)
version 3.1.1

```
dist/                        web app production build
docs/                        project docs and coding guides
e2e/                         end-to-end tests
src/                         project source code
|- app/                      app components
|  |- core/                  core module (singleton services and single-use components)
|  |- shared/                shared module  (common components, directives and pipes)
|  |- app.component.*        app root component (shell)
|  |- app.module.ts          app root module definition
|  |- app-routing.module.ts  app routes
|  +- ...                    additional modules and components
|- assets/                   app assets (images, fonts, sounds...)
|- environments/             values for various build environments
|- theme/                    app global scss variables and theme
|- translations/             translations files
|- index.html                html entry point
|- main.scss                 global style entry point
|- main.ts                   app entry point
|- polyfills.ts              polyfills needed by Angular
+- test.ts                   unit tests entry point
reports/                     test and coverage reports
proxy.conf.js                backend proxy configuration
```
- the api is built from scratch using model-controller-service pattern
api/                contains api routes
models/             database model schema
services/           helpers and third party integrations
index.js            starting point of express server

#### Tools

- NodeJs for server side with express4, socket.io, slack and twitter integrations
- Angular5, ng-socket-io, ngx-bootstrap for client side
- Docker and docker-compose
- Mongodb

#### Coding guides

- https://api.slack.com/rtm
- https://github.com/desmondmorris/node-twitter
- https://github.com/socketio/socket.io
- https://expressjs.com/
- https://angular.io/

