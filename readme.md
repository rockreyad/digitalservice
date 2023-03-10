# Digial Marketing Service Portal

Digital Web Services âDWSâ is a leading IT outsourcing company with specialization in software development, Application development, website designing and digital marketing services. Here we are always working for effective solutions and optimum results at suitable cost so that everyone can increase their business revenue online.

## Prerequisites

You need [Node JS](https://nodejs.org/) installed on your local machine.

## Installation â

Run the follwing command to install all the packages:

```bash
npm run setup
```

### Setup enviornment variable

To run this project, you will need to add the following environment variables.

Set the following environment variable to `backend` directory. Also, an example file is given with the name of `.env.example`:

```bash
SERVER_PORT=4000
#DATABASE_URL="mysql://username:password@localhost:port/testdatabase"
DATABASE_URL="file:./dev.db"
```

Set the following environment variable to `frontend` directory. Also, an example file is given with the name of `.env.example`:

```bash
SERVER_URL=localhost
SERVER_PORT=4000
```

### Database migration

Run the following command to `generate the sql`

```bash
npm run prisma:migrate
```

Run the following command if you want `reset` database and applying migration:

```bash
npm run prisma:reset
```

You only have to run this for only one time at the beginning of project setup

## Run ðââï¸

By this command your app will be run concurrently

```bash
npm run start
```

An server will be run at [http://localhost:4000](http://localhost:4000)

And frontend server will be run at [http://localhost:3000](http://localhost:3000)

# Built With

-   [NodeJS](https://nodejs.org/en/) - Node.jsÂ® is an open-source, cross-platform JavaScript runtime environment.

-   [Express](https://expressjs.com/) - routing and middleware web framework

-   [NEXT](https://nextjs.org/) - Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for our application.

-   [Prisma](https://www.prisma.io/) - Prisma is a next-generation Node.js and TypeScript ORM

-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework, easy to customize, adapts to any design, and the build size is tiny.

## Tech Stack

**Client:** React, NEXT, TailwindCSS , React Query

**Server:** Node, Express

**Database:** Prisma(MySQL)

**Type Check:** Typescript

## Used By

This project is used by the following companies:

-   Ztrios Tech & Marketing

# Credit

# Authors

-   [Md. Mahamud Hasan](https://github.com/rockreyad) - **_software engineeer_**
