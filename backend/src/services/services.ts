import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function create_service(title: string, description: string) {
  const service = await prisma.service.create({
    data: {
      title,
      description,
    },
  });
  return service;
}

async function read() {
  const service = await prisma.service.findMany();
  return service;
}

export { create_service, read };
