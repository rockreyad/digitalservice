import prisma from '../config/prisma'

async function create_service({
    title,
    description,
    price,
    categoryId,
}: {
    title: string
    description: string
    categoryId: number
    price: number
}) {
    const service = await prisma.service.create({
        data: {
            title,
            description,
            price,
            categoryId: categoryId,
            status: true,
        },
    })
    return service
}

async function all_service() {
    const service = await prisma.service.findMany()
    return service
}

async function update_service({
    id,
    description,
    title,
    status,
}: {
    id: number
    title: string
    description: string
    status: boolean
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
    })
    return service
}

async function find_first_service(title: string) {
    const service = await prisma.service.findFirst({
        where: {
            title,
        },
    })
    return service
}

export { create_service, all_service, update_service, find_first_service }
