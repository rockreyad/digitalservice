import prisma from '../src/config/prisma'
import generateInvoice from '../src/helpers/GenerateInvoice'

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
            firstName: 'Reyad',
            lastName: 'Hasan',
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
        where: { email: 'test@gmail.com' },
        update: {},
        create: {
            email: 'test@gmail.com',
            password:
                '$2b$10$ioXNQ8oDKUQT9WZvHih28.dExM4DSn8SHXtscbOjltK8MM6WJhy4C',
            firstName: 'Sabbir',
            lastName: 'Islam',
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

    //upsert an Order with OrderItem and Payment with mobileBanking
    const order = await prisma.order.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
            invoiceId: generateInvoice(1),
            userId: user.user_id,
            price: parseFloat('5020.67'),
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
                        itemPrice: 390,
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
                        itemPrice: 120,
                    },
                ],
            },
            payment: {
                create: {
                    mobileBanking: {
                        create: {
                            bank_name: 'bKash',
                            account_holder_name: 'Rahim',
                            account_number: '01700000000',
                            trxId: 'HT8QWP3Z5S',
                            amount: parseFloat('1500'),
                            status: 3,
                        },
                    },
                },
            },
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
