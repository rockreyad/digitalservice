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

import { authorize } from '../middlewares/auth'
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
        res.send('Express + TypeScript Server')
    })

    /** Service : new,Service list,modify*/
    const serviceRouter = express.Router()
    serviceRouter.get('/', find_all_services)
    serviceRouter.post('/', new_service)
    serviceRouter.put('/', update_a_service)
    app.use('/service', serviceRouter)

    /** Authentication : Login , Register */
    app.post('/login', signInWithEmailAndPassword)
    app.post('/register', RegisterAnUserWithEmailAndPassword)

    /** User : User list, User details, User modify */
    const userRouter = express.Router()
    userRouter.get('/', all_users)
    app.use('/user', authorize, userRouter)

    /** Service Category : new,Service list by Category,modify*/
    app.get('/service/category', find_all_category)
    app.get('/service/category/:categoryId', find_all_services_by_category)
    app.post('/service/category', create_a_category)
    app.put('/service/category', update_a_category)

    /** Order : new,Order list,modify*/
    const orderRouter = express.Router()
    orderRouter.post('/', create_an_order)
    orderRouter.put('/', update_an_order)
    orderRouter.get('/', get_all_order)
    orderRouter.get('/:orderId', find_an_order)
    orderRouter.get('/user/:userId', get_all_order_by_userId)
    app.use('/order', authorize, orderRouter)

    /** Invoice:  */
    const invoiceRouter = express.Router()
    invoiceRouter.get('/:invoiceId', get_invoice_details)
    app.use('/invoice', authorize, invoiceRouter)

    /** Order Status: all OrderStatus */
    const orderStatusRouter = express.Router()
    orderStatusRouter.get('/', get_all_order_status)
    app.use('/order-status', orderStatusRouter)

    /** Payment: */
    const paymentRouter = express.Router()
    paymentRouter.post('/', create_a_payment)
    paymentRouter.get('/:orderId', find_all_order_payments)
    paymentRouter.patch('/:transactionId', update_payment_status_by_id)
    paymentRouter.get('/', find_all_payments)
    paymentRouter.get('/transaction/:transactionId', get_payment_details)
    app.use('/payment', authorize, paymentRouter)
}
