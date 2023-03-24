# Installation and Testing

TeamTeamPlayers, TeamTeam-BookingApp

## Prerequisites
---

- Git (2.25.1)^
- Docker (23.0.1, build a5ee5b1)^
- Docker Compose (v2.4.1)^
- NPM (9.3.1)^

## Installation
---

1. Clone the repository

    ```bash
    $ git clone https://github.com/TomHurford/TeamTeam-BookingApp.git
    ```

2. Navigate to the project directory

    ```bash
    $ cd TeamTeam-BookingApp
    ```

3. Install dependencies

    ```bash
    $ cd api
    $ npm install
    $ cd ../client
    $ npm install
    ```

4. Start the database

    ```bash
    $ cd ..
    $ docker compose up -d postgres
    ```

5. Create environment variables

    ```bash
    $ cd api
    $ cp .env.example .env
    ```

6. Setup the database

    ```bash
    $ # This pushes the schema to the database
    $ npx prisma db push
    $ # This seeds the database with some test data
    $ # If this fails on a unique constraint, run it again as Faker sometimes generates duplicate data
    $ npx prisma db seed
    ```

7. Create environment variables in client

    ```bash
    $ cd ../client
    $ cp .env.example .env
    ```

Once these steps have been completed, the application should be ready to run. The database can be stopped at any time using the following command:

```bash
$ docker compose down
```

## Testing
---

1. Start the database

    ```bash
    $ docker compose up -d postgres
    ```
2. Run the tests (backend)

    ```bash
    $ cd api
    $ npx prisma migrate reset
    $ npx jest
    $ # These may take some time to run.
    ```

3. Run the tests (frontend)

    ```bash
    $ # Start the api
    $ cd api
    $ npx prisma migrate reset
    $ nodemon
    $ # In a different terminal
    $ # Start the client
    $ cd ../client
    $ # To run the cypress tests the application must be running
    $ npm start
    $ # In a new terminal
    $ cd ../client
    $ npm run test:all
    $ # These may take some time to run. There are 2 parts to the tests so please wait for both to finish.
    ```

If you want to run the tests mutliple times, you can run the following command to clear the database:

```bash
$ # With the database running
$ cd api
$ npx prisma migrate reset
$ # This will delete all data in the database and re-seed it
$ # Select y when prompted
```

If errors occur during testing following instructions above:
```bash
$ # On the first test, tests may fail due to database reasons. If this occurs run the commands below again:
$ npx prisma migrate reset
$ npx jest # If running backend
$ npm run test:all # If running frontend
```

## Running the application
---

We can run the application in two ways:

We will assume you have the database started already. If not, you can start it using the following command:

```bash
$ docker compose up -d postgres
```

1. Run the application in development mode

    ```bash
    $ # Start the api
    $ cd api
    $ nodemon
    $ # Start the client
    $ cd ../client
    $ npm start
    ```

2. Run the application in production mode

    ```bash
    $ # Be in the root directory
    $ docker compose build
    $ # This builds the images for the api and client and may take some time
    $ docker compose up -d
    ```

## Stopping the application
---

1. Stop the application in development mode

    ```bash
    $ # Stop the api
    $ cd api
    $ ctrl + c
    $ # Stop the client
    $ cd ../client
    $ ctrl + c
    ```

2. Stop the application in production mode

    ```bash
    $ docker compose down
    ```

## Using the application
---

Once the application is running, you can access it at http://localhost:3000. You can log in using the following credentials:

- Email: `admin@admin.com`
- Password: `admin123`

or 

- Email: `student@kcl.ac.uk`
- Password: `student`

or

- You can sign up as a new user using the sign up button.

## Troubleshooting
---

- If you are having issues with the database, you can try deleting the `migrations` folder in the `api/prisma` directory and then running the following command:

    ```bash
    $ # With the database running
    $ cd api
    $ npx prisma migrate dev
    $ # This will recreate the migrations folder and push the schema to the database
    $ # Select y when prompted
    $ # Name the migration anything you like
    ```
