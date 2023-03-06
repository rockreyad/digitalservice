import prisma from '../config/prisma'

async function user_list() {
    const users = await prisma.user.findMany()
    return users
}

async function get_user({ email }: { email: string }) {
    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    })
    return user
}

export { user_list, get_user }
