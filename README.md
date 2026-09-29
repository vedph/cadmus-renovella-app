# Cadmus Renovella App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.1.3.

## Docker

🐋 Quick Docker image build:

1. update version number in `env.js` (and in Docker files);
2. `npm run build-lib`;
3. `ng build --configuration production`;
4. `docker build . -t vedph2020/cadmus-renovella-app:5.0.0 -t vedph2020/cadmus-renovella-app:latest` (replace with the current version).

## Production

1. build the image as above.
2. after building the app, change `env.js` in the `dist` folder for this variable:

    ```js
    window.__env.apiUrl = "https://renovella.unisi.it:40393/api/";
    ```

3. build a new image for production: `docker build . -t vedph2020/cadmus-renovella-app:3.0.6-prod`. The production version is labeled like this one, with `-prod` suffix.

## Setup

```sh
ng new cadmus-renovella-app
cd cadmus-renovella-app
ng add @angular/material
ng add @angular/localize
ng g library @myrmidon/cadmus-renovella-part-ui --prefix cadmus
ng g library @myrmidon/cadmus-renovella-part-pg --prefix cadmus
```
