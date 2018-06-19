# User profile component

## Pre launch

Run `npm i` to install all dependencies.

## Development server

Run `npm start` for dev server @ `http://localhost:4200/`.

## Demo server

Run `npm run demo` for demo server @ `http://localhost:3000/`, it creates a lite-server that serves from `./demo` directory.

## Build component

Run `npm run build:elements` for web components build, it creates `./demo/user-profile.js`.

## Run unit tests

Run `npm run test` for unit tests.

## Usage in external applications

Put `<user-profile user-id="<number>" logged-user-id="<number>"></user-profile>` && `<script src="user-profile.js"></script>` in body, where `user-id` = `userId<number>`, `logged-user-id` = `userId<number>` from data.json.
