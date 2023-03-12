import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config'

export const authorize = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const decode = jwt.verify(token as string, config.jwt.secret)
        const { userId, role } = decode as any
        let requestUser = {
            userId,
            role,
        }
        req.body.requestUser = requestUser
        next()
    } catch (error) {
        res.status(401).json({ status: false, message: 'NO token provided' })
    }
}

export const authorizeAdmin = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        const decode = jwt.verify(token as string, config.jwt.secret)
        const { userId, role } = decode as any
        let requestUser = {
            userId,
            role,
        }
        req.body.requestUser = requestUser
        if (requestUser.role === 'admin') {
            next()
        } else {
            res.status(401).json({
                status: false,
                message: 'You are not authorized',
            })
        }
    } catch (error) {
        res.status(401).json({ status: false, message: 'NO token provided' })
    }
}
