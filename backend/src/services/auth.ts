import prisma from '../config/prisma'

async function create_user({
    firstName,
    lastName,
    email,
    password,
    phone,
}: {
    firstName: string
    lastName: string
    email: string
    password: string
    phone: string
}) {
    const createaccount = prisma.user.create({
        data: {
            firstName,
            lastName,
            password,
            email,
            phone,
            role: {
                create: {
                    roleDescriptionId: 2,
                },
            },
        },
        include: {
            role: {
                select: {
                    role: {
                        select: {
                            role_name: true,
                        },
                    },
                },
            },
        },
    })

    return createaccount
}

async function login_user({
    email,
    password,
}: {
    email: string
    password: string
}) {
    const user = await prisma.user.findUnique({
        where: { email },
        include: {
            role: {
                select: {
                    role: {
                        select: {
                            role_name: true,
                        },
                    },
                },
            },
        },
    })

    return user
}

export { create_user, login_user }
