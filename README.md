# TeamTeam-BookingApp

## Developing with Docker

### Prerequisites

- [Docker](https://docs.docker.com/install/)
- [Docker Compose](https://docs.docker.com/compose/install/)

### Running the app

- `docker-compose up` to start the app (This starts, react, express, and postgres in separate containers)
- `docker-compose down` to stop the app

Once running you can access the apps at:
- react: https://localhost:3000
- express: https://localhost:5001
- postgres: https://localhost:5432

### Developing outside of Docker

I would recommend running the postgres container in docker and running the react and express apps outside of docker. This will allow you to use your IDE to debug the react and express apps.

- `docker-compose up postgres` to start the postgres container
- `cd api && npm run dev` to start the express app
- `cd client && npm start` to start the react app

(If you haven't already, you will need to create a `.env` file in the `api` directory. See the `api/README.md` for more details.)
(Additionally, if you haven't installed the dependencies for the react and express apps, you will need to run `npm install` in the `api` and `client` directories.)


