# Digital Marketing Service Portal

Digital Web Services “DWS” is a leading IT outsourcing company with specialization in software development, Application development, website designing and digital marketing services. Here we are always working for effective solutions and optimum results at suitable cost so that everyone can increase their business revenue online.

## Prerequisites

You need [Node JS](https://nodejs.org/) installed on your local machine.

## Installation 🛠

Run the follwing command to install all the packages:

```bash
npm run setup
```

### Setup enviornment variable 🌳

To run this project, you will need to add the environment variables.

Run the following command to create `.env` files inside `backend` && `frontend` directory

```bash
    cd backend && cp .env.example .env && cd .. && cd frontend && cp .env.example .env && cd ..
```

**NOTE:** Update the `.env` file with your own values

### Setup supabase

<span style="background-color:#ff0000; font-weight: bold; padding-inline:5px; border-radius: 5px">_ignore:_</span> if you want to use supabase as database then you have to update the `.env` file from `backend` directories with your own values otherwise you can use sqlite as database

Read the supabase docs to get the `DIRECT_URL` and `DATABASE_URL` key [here](https://supabase.com/docs/guides/integrations/prisma#step-2-testing-the-connection)

### Database migration 🗄

Delete the `migrations` folder from `backend/prisma` directory

Update the following code with `lines 5-16` in the `schema.prisma` file from `backend/prisma` directory to use `sqlite` as database

```prisma
// POstgresql Connector
//  datasource db {
//    provider  = "postgresql"
//    url       = env("DATABASE_URL")
//    directUrl = env("DIRECT_URL")
//  }

// SQLite Connector
datasource db {
 provider = "sqlite" // data source connector
 url      = env("DATABASE_URL") // path to the database file
}
```

Run the following command to `generate the sql`

```bash
npm run prisma:migrate
```

Run the following command if you want `reset` database and applying migration:

```bash
npm run prisma:reset
```

You only have to run one of the following command for only one time at the beginning of project setup

## Run 🏃‍♂️

By this command your app will be run `development` mode concurrently

```bash
npm run start
```

#### Run in Production Mode 🚀

By this command your app will be run `production` mode concurrently

```bash
npm run build && npm run start:prod
```

A server will be run at [http://localhost:4000](http://localhost:4000)

And frontend server will be run at [http://localhost:3000](http://localhost:3000)

### Default Login Credentials 🔐

```bash
#admin
email: admin@gmail.com
password: 102030

#user
email: test@gmail.com
password: 102030
```

### Project Documentation 📖

inside `docs` directory

-   [Project Report](https://github.com/rockreyad/digitalservice/blob/main/docs/project-report.pdf)
-   [Project Presentation](https://github.com/rockreyad/digitalservice/blob/main/docs/presentation.pptx)

# Built With 🛠

-   [NodeJS](https://nodejs.org/en/) - Node.js® is an open-source, cross-platform JavaScript runtime environment.

-   [Express](https://expressjs.com/) - routing and middleware web framework

-   [NEXT](https://nextjs.org/) - Next.js handles the tooling and configuration needed for React, and provides additional structure, features, and optimizations for our application.

-   [Prisma](https://www.prisma.io/) - Prisma is a next-generation Node.js and TypeScript ORM

-   [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework, easy to customize, adapts to any design, and the build size is tiny.

## Tech Stack

**Client:** React, NEXT, Chakra, TailwindCSS , React Query

**Server:** Node, Express

**Database:** Prisma - Development (Sqlite) Production (postgres)

**Type Check:** Typescript

## Used By

This project is used by the following companies:

-   Ztrios Tech & Marketing

Project was created for Internship Purpose

-   IUBAT- International University of Business Agriculture and Technology

# Credit & Supervised By

[Krishna Das](http://cse.iubat.edu/krishna-das/)

### Authors

-   [Md. Mahamud Hasan](https://www.linkedin.com/in/rockreyad) - **_software engineeer_**
