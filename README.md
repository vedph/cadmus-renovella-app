# Cadmus Re.Novella App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Docker

Quick Docker image build:

1. `npm run build-lib`
2. `ng build --configuration production`
3. `docker build . -t vedph2020/cadmus-renovella-app:1.1.0 -t vedph2020/cadmus-renovella-app:latest` (replace with the current version).

## Production

1. build the image as above.
2. after building the app, change `env.js` in the `dist` folder for this variable:

```js
window.__env.apiUrl = "https://renovella.unisi.it:40393/api/";
```

3. build a new image for production: `docker build . -t vedph2020/cadmus-renovella-app:1.0.11-prod`. The production version is labeled like this one, with `-prod` suffix.

## History

- 2021-10-17: replaced `DocReference` and `PersonName` (now `ProperName`) with models from bricks. `CitedPerson` is now a submodel of this project so that it does no more depends on Itinera. This is a breaking change. See the [core](https://github.com/vedph/cadmus-renovella) repository for more.
