[![Coverage Status](https://coveralls.io/repos/github/renatops1991/phonebook-service/badge.svg?branch=main)](https://coveralls.io/github/renatops1991/phonebook-service?branch=main)
![typescript](https://img.shields.io/badge/Typescript-4.9.3-blue)
![nodejs](https://img.shields.io/badge/node-v16.17.1-green)
![npm](https://img.shields.io/badge/npm-v8.15.0-blue)
![mongodb](https://img.shields.io/badge/mongodb-5.1.0-green)
## Phonebook Service
The phonebook service is a phone contact API. Where you can create, 
update and search contact data bringing together weather forecast data from the HG Brasil 

## Installation
```bash
cp example.env .env

npm install

npm run build
```

## Running application
```bash
# run docker
docker compose up

# run with node
npm run start:dev
```

## Running tests
```bash
# Running all tests
npm run test

# Running unit tests
npm run test:unit

# Running integration tests
npm run test:e2e
```

## Architecture
![phone book architecture](./phonebook-architecture.jpg)

## Documentation
After running the application, you can access the documentation, through the url `http://localhost:3001/docs`