import prisma from "../config/prisma";

async function create_service({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  const service = await prisma.service.create({
    data: {
      title,
      description,
    },
  });
  return service;
}

async function all_service() {
  const service = await prisma.service.findMany();
  return service;
}

async function update_service({
  id,
  description,
  title,
  status,
}: {
  id: number;
  title: string;
  description: string;
  status: boolean;
}) {
  const service = await prisma.service.update({
    where: {
      id,
    },
    data: {
      title,
      description,
      status,
    },
  });
  return service;
}

export { create_service, all_service, update_service };
