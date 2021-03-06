# Cadmus Re.Novella App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Docker

Quick Docker image build:

1. update version number in `env.js`.
2. `npm run build-lib`
3. `ng build --configuration production`
4. `docker build . -t vedph2020/cadmus-renovella-app:1.2.7 -t vedph2020/cadmus-renovella-app:latest` (replace with the current version).

## Production

1. build the image as above.
2. after building the app, change `env.js` in the `dist` folder for this variable:

```js
window.__env.apiUrl = "https://renovella.unisi.it:40393/api/";
```

3. build a new image for production: `docker build . -t vedph2020/cadmus-renovella-app:1.2.7-prod`. The production version is labeled like this one, with `-prod` suffix.

## History

### 1.2.7

- 2022-05-13: added witnesses part.

### 1.2.6

- 2022-05-05: fixed locale issue.

### 1.2.5

- 2022-05-03: TaleStoryPart: date no more required.

### 1.2.4

- 2022-05-01:
  - upgraded Angular (13.3.5).
  - genres in tale info part changed validation to not required.

### 1.2.3

- 2022-03-03: upgraded Angular.

### 1.2.2

- 2022-02-20: on request, added `age` to `TaleStoryPart` and made `date` optional.

### 1.2.1

- 2022-02-16: updated packages (misaligned external IDs).
- 2022-02-16: updated `@myrmidon/cadmus-part-refs-ui` and `@myrmidon/cadmus-part-refs-pg`.

### 1.2.0

- 2022-02-14: upgraded to Angular 13.2.2 and generated production image `1.2.0-prod`.
- 2021-11-11: upgraded to Angular 13.
- 2021-10-17: replaced `DocReference` and `PersonName` (now `ProperName`) with models from bricks. `CitedPerson` is now a submodel of this project so that it does no more depends on Itinera. This is a breaking change. See the [core](https://github.com/vedph/cadmus-renovella) repository for more.
