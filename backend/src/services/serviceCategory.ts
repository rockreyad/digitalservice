import prisma from '../config/prisma'

async function create_category({
    name,
    description,
}: {
    name: string
    description: string
}) {
    const category = await prisma.serviceCategory.create({
        data: {
            name,
            description,
        },
    })
    return category
}

async function all_category() {
    const category = await prisma.serviceCategory.findMany()
    return category
}

async function update_category({
    id,
    description,
    name,
}: {
    id: number
    name: string
    description: string
}) {
    const category = await prisma.serviceCategory.update({
        where: {
            id,
        },
        data: {
            name,
            description,
        },
    })
    return category
}

async function find_first_category({ name }: { name: string }) {
    const category = await prisma.serviceCategory.findFirst({
        where: {
            name,
        },
    })
    return category
}

async function find_first_category_by_id({ id }: { id: number }) {
    const category = await prisma.serviceCategory.findFirst({
        where: {
            id,
        },
    })
    return category
}

async function delete_category({ id }: { id: number }) {
    const category = await prisma.serviceCategory.delete({
        where: {
            id,
        },
    })
    return category
}

async function find_category_by_id({ id }: { id: number }) {
    const category = await prisma.serviceCategory.findMany({
        where: {
            id,
        },
    })
    return category
}

async function find_all_services_by_category_id({
    categoryId,
}: {
    categoryId: number
}) {
    const service = await prisma.service.findMany({
        where: {
            categoryId,
        },
    })
    return service
}

export {
    all_category,
    create_category,
    update_category,
    find_first_category,
    find_first_category_by_id,
    delete_category,
    find_category_by_id,
    find_all_services_by_category_id,
}
