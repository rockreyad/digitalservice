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
    })

    return user
}

export { create_user, login_user }
