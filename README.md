# pathe-server
[![Build Status](https://travis-ci.org/filmplanner/api.svg?branch=master)](https://travis-ci.org/filmplanner/api)
[![Coverage Status](https://coveralls.io/repos/github/filmplanner/api/badge.svg?branch=master)](https://coveralls.io/github/filmplanner/api?branch=master)
[![Code Climate](https://img.shields.io/codeclimate/github/filmplanner/api.svg?style=flat-square)](https://codeclimate.com/github/filmplanner/api)

> Server side of the Pathé Planner application
## Build setup
Start server:
```sh
# Start server
yarn start
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