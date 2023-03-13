import prisma from '../src/config/prisma'

async function main() {
    // Create a new user

    //upsert Admin
    const admin = await prisma.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            email: 'admin@gmail.com',
            password:
                '$2b$10$ioXNQ8oDKUQT9WZvHih28.dExM4DSn8SHXtscbOjltK8MM6WJhy4C',
            firstName: 'Admin',
            lastName: 'Admin',
            phone: '0123456789',
            role: {
                create: {
                    role: {
                        create: {
                            role_name: 'admin',
                            description: 'Admin have all acess to this system',
                        },
                    },
                },
            },
        },
    })

    //upsert user
    const user = await prisma.user.upsert({
        where: { email: 'user@gmail.com' },
        update: {},
        create: {
            email: 'user@gmail.com',
            password:
                '$2b$10$ioXNQ8oDKUQT9WZvHih28.dExM4DSn8SHXtscbOjltK8MM6WJhy4C',
            firstName: 'User',
            lastName: 'User',
            phone: '0123456789',
            role: {
                create: {
                    role: {
                        create: {
                            role_name: 'user',
                            description:
                                'user have limited access to this system',
                        },
                    },
                },
            },
        },
    })

    //upsert OrderStatus
    const orderStatusPending = await prisma.orderStatus.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'pending',
            description: 'order is pending',
        },
    })

    const orderStatusDelivered = await prisma.orderStatus.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'delivered',
            description: 'order is delivered',
        },
    })

    const orderStatusComplete = await prisma.orderStatus.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'complete',
            description: 'order is complete',
        },
    })
    const orderStatusFraud = await prisma.orderStatus.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            name: 'fraud',
            description: 'order is fraud',
        },
    })
    const orderStatusProcessing = await prisma.orderStatus.upsert({
        where: { id: 5 },
        update: {},
        create: {
            id: 5,
            name: 'processing',
            description: 'order is Processing',
        },
    })

    //upsert PaymentStatus
    const paymentStatusPending = await prisma.paymentStatus.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'pending',
            description:
                'This is a payment that has begun, but is not complete.  An example of this is someone who has filled out the checkout form and then gone to PayPal for payment.  We have the record of sale, but they haven’t completed their payment yet',
        },
    })
    const paymentStatusFailed = await prisma.paymentStatus.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'failled',
            description:
                'This is a payment where the payment process failed, whether it be a credit card rejection or some other error.',
        },
    })
    const paymentStatusComplete = await prisma.paymentStatus.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'complete',
            description:
                'This is a payment that has been paid and the product delivered to the customer',
        },
    })
    const paymentStatusRefunded = await prisma.paymentStatus.upsert({
        where: { id: 4 },
        update: {},
        create: {
            id: 4,
            name: 'refunded',
            description:
                'This is a payment where money has been transferred back to the customer and the customer no longer has access to the product.',
        },
    })

    //upsert PaymentMethod
    const paymentMethodCash = await prisma.paymentMethod.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            name: 'cash',
            description: 'Cash payment',
        },
    })
    const paymentMethodCard = await prisma.paymentMethod.upsert({
        where: { id: 2 },
        update: {},
        create: {
            id: 2,
            name: 'debit card',
            description:
                'Debit card transactions can be declined if you do not have enough money in your account',
        },
    })
    const paymentMethodMobileBanks = await prisma.paymentMethod.upsert({
        where: { id: 3 },
        update: {},
        create: {
            id: 3,
            name: 'mobile banks',
            description: 'Bkash, Nagad,Rocket, SureCash, Ucash',
        },
    })

    //upsert an Order with OrderItem
    const order = await prisma.order.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            userId: user.user_id,
            price: parseFloat('100.67'),
            statusId: 1,
            orderItems: {
                create: [
                    {
                        service: {
                            create: {
                                title: 'Custom website design and development',
                                description:
                                    'Create a professional custom website for your business with the latest web technologies (AngularJS, ReactJS and more).',
                                category: {
                                    create: {
                                        name: 'Web design and development',
                                        description:
                                            'Create stunning websites with powerful functionality',
                                    },
                                },
                                price: parseFloat('100.27'),
                            },
                        },
                        itemPrice: 0,
                    },
                    {
                        service: {
                            create: {
                                title: 'Search Engine Optimization (SEO)',
                                description:
                                    'improving the quality and quantity of website traffic to a website or a web page from search engines',
                                category: {
                                    create: {
                                        name: 'Digital Marketing',
                                        description:
                                            'Boost online visibility and drive traffic to your website',
                                    },
                                },
                                price: parseFloat('450.81'),
                            },
                        },
                        itemPrice: 0,
                    },
                ],
            },
            payment: {
                create: {
                    paymentAmount: parseFloat('230.99'),
                    paymentStatusId: 1,
                    paymentMethodId: 1,
                },
            },
        },
    })

    //Upsert a payment
    const payment = await prisma.payment.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            paymentAmount: parseFloat('100.67'),
            paymentStatusId: 1,
            paymentMethodId: 1,
            orderId: order.id,
        },
    })

    console.log({
        admin,
        user,
        order,
    })
}

main()
    .then(async () => await prisma.$disconnect())
    .catch(async (error) => {
        console.log(error)
        await prisma.$disconnect()
        process.exit(1)
    })
