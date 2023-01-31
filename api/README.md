# Developing in API

## Creating the .env file

The .env file is used to store environment variables. The .env file is not checked into git. You will need to create a .env file in the api directory. The .env file should look like this:

```bash
# .env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/postgres?schema=public"
```

## Running the app

If you arent using docker to run the express app, you will need to install the dependencies. You can do this by running `npm install` in the api directory.

```bash
# install dependencies
npm install
```

You can then run the app by running `npm run dev` in the api directory.

```bash
# run the app
npm run dev
```

You should also have nodemon installed as part of the dependencies. Nodemon will watch for changes in the code and restart the app when changes are detected.

```bash
# run with nodemon
npx nodemon start
```



