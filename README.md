# Chat-App-Api

Node.js/Express.js based API for ChatApp

## CircleCI

## Getting Started

### Prerequisites

-   Node
-   Mysql
-   SocketIO

### Configuration

Update your environment, datasource, as well as mysql config
You will need to fill the credentials for mysql

### Install dependencies

```bash
npm install
```

### Run docker-compose

#### Development

-   Uncommend the mysql and adminer services in docker-compose.yml
-   Comment the mysql and adminer services in docker-compose.yml

#### Testing

-   Commend the mysql and adminer services in docker-compose.yml
-   Uncomment the mysql and adminer services in docker-compose.yml

#### Run command docker-compose

```
docker-compose up --build
```

make sure update your environment into docker.

### Database migrations

```
npm run typeorm migration:create -n <fineName>

npm run typeorm migration:run

npm run typeorm migration:revert
```

## Running the app

### Development

### Prerequisites

Update your env into file .env.development and docker.env

#### steps

1. npm install
2. docker-compose up --build
3. npm run typeorm migration:run
4. npm run dev

### Production

```bash
npm run build
npm run start
```

## Testing

The project contains 2 categories of tests. To run all tests with one
command:

```bash
npm run test
```

### Unit tests

```bash
npm run test:unit
```

Test a single thing at a time. Unit tests should be fast, should not rely on
external dependencies, and should be run regularly (during automated builds).

### Integration tests

```bash
npm run test:integration
```

Test the interactions between modules/services. Such tests can test
integrations amongst internal services as well as integrations with external services.

## Adminer

`url: localhost:8080`
assess to adminer with user and password in docker.env file
