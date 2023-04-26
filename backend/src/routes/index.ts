import express, { Express, Request, Response } from 'express'
import {
    RegisterAnUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from '../controllers/authentication'
import {
    new_service,
    find_all_services,
    update_a_service,
} from '../controllers/services'
import { all_users } from '../controllers/users'
import {
    find_all_services_by_category,
    create_a_category,
    update_a_category,
    find_all_category,
} from '../controllers/serviceCategory'
import {
    create_an_order,
    find_an_order,
    get_all_order,
    get_all_order_by_userId,
    get_all_order_status,
    update_an_order,
} from '../controllers/order'

import { authorize, authorizeAdmin } from '../middlewares/auth'
import {
    create_a_payment,
    find_all_order_payments,
    find_all_payments,
    get_payment_details,
    update_payment_status_by_id,
} from '../controllers/payment'
import { get_invoice_details } from '../controllers/invoice'

export default function routes(app: Express) {
    app.get('/', (req: Request, res: Response) => {
        const welcomeMessage = 'Welcome to the DWS website!'
        const companyDescription =
            'We are a leading IT outsourcing company specializing in software development, application development, website design, and digital marketing services. Our goal is to provide effective solutions and optimum results at suitable costs, so that our clients can increase their business revenue online.'
        const contactInformation =
            'To learn more about our services or request a consultation, please visit our website or contact us at info@dws.com.'

        const formattedResponse = `
          <h1>${welcomeMessage}</h1>
          <p>${companyDescription}</p>
          <p>${contactInformation}</p>
        `

        res.send(formattedResponse)
    })

    /** Authentication : Login , Register */
    app.post('/login', signInWithEmailAndPassword)
    app.post('/register', RegisterAnUserWithEmailAndPassword)

    /** User : User list, User details, User modify */
    const userRouter = express.Router()
    userRouter.get('/', all_users)
    app.use('/user', authorize({}), userRouter)

    /** Service Category : new,Service list by Category,modify*/
    const categoryRouter = express.Router()
    categoryRouter.get('/', find_all_category)
    categoryRouter.get('/:categoryId', find_all_services_by_category)
    categoryRouter.post('/', authorizeAdmin, create_a_category)
    categoryRouter.put('/', update_a_category)
    app.use('/category', categoryRouter)

    /** Service : new,Service list,modify*/
    const serviceRouter = express.Router()
    serviceRouter.get('/', find_all_services)
    serviceRouter.post('/', new_service)
    serviceRouter.put('/', update_a_service)
    app.use('/service', serviceRouter)

    /** Order : new,Order list,modify*/
    const orderRouter = express.Router()
    orderRouter.post('/', authorize({}), create_an_order)
    orderRouter.patch('/:orderId', authorizeAdmin, update_an_order)
    orderRouter.get('/', authorize({}), get_all_order)
    orderRouter.get('/:orderId', authorize({}), find_an_order)
    orderRouter.get('/user/:userId', authorizeAdmin, get_all_order_by_userId)
    app.use('/order', orderRouter)

    /** Invoice:  */
    const invoiceRouter = express.Router()
    invoiceRouter.get('/:invoiceId', get_invoice_details)
    app.use('/invoice', authorize({}), invoiceRouter)

    /** Order Status: all OrderStatus */
    const orderStatusRouter = express.Router()
    orderStatusRouter.get('/', get_all_order_status)
    app.use('/order-status', authorize({}), orderStatusRouter)

    /** Payment: */
    const paymentRouter = express.Router()
    paymentRouter.post('/', create_a_payment)
    paymentRouter.get('/:orderId', find_all_order_payments)
    paymentRouter.patch('/:transactionId', update_payment_status_by_id)
    paymentRouter.get('/', find_all_payments)
    paymentRouter.get('/transaction/:transactionId', get_payment_details)
    app.use('/payment', authorize({}), paymentRouter)
}
