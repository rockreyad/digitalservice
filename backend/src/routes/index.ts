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
    update_an_order,
} from '../controllers/order'

import { authorize } from '../middlewares/auth'

export default function routes(app: Express) {
    app.get('/', (req: Request, res: Response) => {
        res.send('Express + TypeScript Server')
    })

    /** Service : new,Service list,modify*/
    app.get('/service', find_all_services)
    app.post('/service', new_service)
    app.put('/service', update_a_service)

    /** Authentication : Login , Register */
    app.post('/login', signInWithEmailAndPassword)
    app.post('/register', RegisterAnUserWithEmailAndPassword)

    /** User : User list, User details, User modify */
    app.get('/user', all_users)

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
}
