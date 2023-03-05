import prisma from "../src/config/prisma";

async function main() {
  // Create a new user

  //upsert Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: "admin",
      firstName: "Admin",
      lastName: "Admin",
      phone: "0123456789",
      role: {
        create: {
          role: {
            create: {
              role_name: "admin",
              description: "Admin have all acess to this system",
            },
          },
        },
      },
    },
  });

  //upsert user
  const user = await prisma.user.upsert({
    where: { email: "user@gmail.com" },
    update: {},
    create: {
      email: "user@gmail.com",
      password: "user",
      firstName: "User",
      lastName: "User",
      phone: "0123456789",
      role: {
        create: {
          role: {
            create: {
              role_name: "user",
              description: "user have limited access to this system",
            },
          },
        },
      },
    },
  });

  //upsert OrderStatus
  const orderStatusPending = await prisma.orderStatus.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Pending",
      description: "order is pending",
    },
  });

  //upsert PaymentStatus
  const paymentStatusPending = await prisma.paymentStatus.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Pending",
      description: "Payment is pending",
    },
  });
  const paymentStatusFailed = await prisma.paymentStatus.upsert({
    where: { id: 2 },
    update: {},
    create: {
      id: 2,
      name: "Failled",
      description: "Payment is Failled",
    },
  });

  //upsert PaymentMethod
  const paymentMethodCash = await prisma.paymentMethod.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      name: "Cash",
      description: "Cash payment",
    },
  });

  //upsert an Order with OrderItem
  const order = await prisma.order.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      userId: user.user_id,
      price: parseFloat("100.67"),
      statusId: 1,
      orderItems: {
        create: [
          {
            service: {
              create: {
                title: "Service 1",
                description: "Service 1 description",
                category: {
                  create: {
                    name: "Category 1",
                    description: "Category 1 description",
                  },
                },
              },
            },
          },
          {
            service: {
              create: {
                title: "Service 2",
                description: "Service 2 description",
                category: {
                  create: {
                    name: "Category 2",
                    description: "Category 2 description",
                  },
                },
              },
            },
          },
        ],
      },
      payment: {
        create: {
          paymentAmount: parseFloat("100.67"),
          paymentStatusId: 1,
          paymentMethodId: 1,
        },
      },
    },
  });

  //Upsert a payment
  const payment = await prisma.payment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      paymentAmount: parseFloat("100.67"),
      paymentStatusId: 1,
      paymentMethodId: 1,
      orderId: order.id,
    },
  });

  console.log({
    admin,
    user,
    order,
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (error) => {
    console.log(error);
    await prisma.$disconnect();
    process.exit(1);
  });
