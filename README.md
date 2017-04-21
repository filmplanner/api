# pathe-server
[![Build Status](https://travis-ci.org/pathe-planner/pathe-server.svg?branch=master)](https://travis-ci.org/pathe-planner/pathe-server)
[![Coverage Status](https://coveralls.io/repos/github/pathe-planner/pathe-server/badge.svg?branch=master)](https://coveralls.io/github/pathe-planner/pathe-server?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/pathe-planner/pathe-server.svg?style=flat-square)](https://codeclimate.com/github/pathe-planner/pathe-server)

> Server side of the Pathé Planner application
## Build setup
```
Start server:
```sh
# Start server
yarn start

# Selectively set DEBUG env var to get logs
DEBUG=express-mongoose-es6-rest-api:* yarn start
```

Tests:
```sh
# Run tests written in ES6 
yarn test

# Run test along with code coverage
yarn test:coverage

# Run tests on file change
yarn test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
yarn test:check-coverage
```

Lint:
```sh
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:watch
```

Other gulp tasks:
```sh
# Wipe out dist and coverage directory
gulp clean

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```