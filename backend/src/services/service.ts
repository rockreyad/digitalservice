import prisma from "../config/prisma";

async function create_service({
  title,
  description,
  categoryId,
}: {
  title: string;
  description: string;
  categoryId: number;
}) {
  const service = await prisma.service.create({
    data: {
      title,
      description,
      categoryId: categoryId,
<<<<<<< HEAD
      status: true,
=======
>>>>>>> main
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

<<<<<<< HEAD
async function find_first_service(title: string) {
=======
async function find_first_service({ title }: { title: string }) {
>>>>>>> main
  const service = await prisma.service.findFirst({
    where: {
      title,
    },
  });
  return service;
}

export { create_service, all_service, update_service, find_first_service };
