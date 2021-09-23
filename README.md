# Cadmus Re.Novella App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Docker

Quick Docker image build:

1. `npm run build-lib`
2. `ng build --configuration production`
3. `docker build . -t vedph2020/cadmus-renovella-app:1.0.11 -t vedph2020/cadmus-renovella-app:latest` (replace with the current version).

## Production

1. build the image as above.
2. after building the app, change `env.js` in the `dist` folder for this variable:

```js
window.__env.apiUrl = "https://renovella.unisi.it:40393/api/";
```

3. build a new image for production: `docker build . -t vedph2020/cadmus-renovella-app:1.0.11-prod`. The production version is labeled like this one, with `-prod` suffix.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
