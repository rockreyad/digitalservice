import prisma from "../config/prisma";

async function create_role({ userId }: { userId: string }) {
  const role = await prisma.role.create({
    data: {
      userId,
      roleDescriptionId: 2,
    },
    select: {
      role: {
        select: {
          role_name: true,
        },
      },
    },
  });

  return role;
}

async function get_role({ userId }: { userId: string }) {
  const role = await prisma.role.findMany({
    where: {
      userId,
    },
    include: {
      role: {
        select: {
          role_name: true,
          description: true,
        },
      },
    },
  });
  return role;
}

async function set_role({
  roleId,
  roleDescriptionId = 2,
}: {
  roleId: number;
  roleDescriptionId: number;
}) {
  const role = await prisma.role.update({
    where: {
      id: roleId,
    },
    data: {
      roleDescriptionId,
    },
  });
  return role;
}

export { create_role, get_role, set_role };
