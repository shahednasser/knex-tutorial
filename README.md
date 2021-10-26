# Knex.js Tutorial

Code for Knex.js Tutorial.

## Installation

After cloning the repository, install the dependencies:

```bash
npm i
```

This project uses SQLite by default. If you need to make changes to that make changes in `db/knexfile.js`.

After that, run the following to execute the migrations:

```bash
npm run migrate
```

Then, add demo data:

```bash
npm run seed
```

## Running the Server

To run the server:

```bash
npm start
```