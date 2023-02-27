import prisma from "../config/prisma";

async function create_user({ firstName, lastName, email, password, phone }: { firstName: string, lastName: string, email: string, password: string, phone: number }) {
    const createaccount = prisma.user.create({
        data: {
            firstName,
            lastName,
            password,
            email,
            phone
        }
    })
    return createaccount;
}


export { create_user }