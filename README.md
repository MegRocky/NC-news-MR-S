# News API

## API for the backend of an article-based social media site

This project uses Node.js, PostgreSQL and an express.js server to seed and build endpoints for an API that provides the required data for an interactive news site.

[Hosted version available here](https://nc-news-mr-s.onrender.com)

## How to use this repo

Before you begin, make sure you have the following installed on your system:

- Node.js (v23.3.0 or higher)
- PostgreSQL (v16.6 or higher)
- npm (package manager)

For security this repo uses evironment variables to store database names, these are stored in local files which are gitignored. Once you've cloned this repo you will need to add two files containing your development and test database names as PGDATABASE variables. You should name these files .env.test and .env.development respectively.

### Installation

- clone the repo locally
- navigate to project directory
- run npm install (this will install the required dependancies for testing and deployment)

### Key Commands

- run the following commands to set up the database:

```
npm run setup-dbs
npm run seed
```

- to start the database run this command:

```
npm run start
```

- to run the test suites:

```
npm test
```

### Key Dependancies

- pg (PostgreSQL client for Node.js)
- pg-format (to assist with formatting data in order to seed the database)
- Jest & jest-sorted (for testing)
- Supertest (for testing HTTP endpoints)
- dotenv (to allow for loading envionment variable)

---

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
