import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create a new user

  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: "admin",
      firstName: "Admin",
      lastName: "Admin",
      phone: "0123456789",
      role: {
        create: {
          role: {
            create: {
              role_name: "admin",
              description: "Admin have all acess to this system",
            },
          },
        },
      },
    },
  });

  const user = await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      email: "user@gmail.com",
      password: "user",
      firstName: "User",
      lastName: "User",
      phone: "0123456789",
      role: {
        create: {
          role: {
            create: {
              role_name: "user",
            },
          },
        },
      },
    },
  });
  console.log({ admin, user });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
