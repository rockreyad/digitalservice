import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import { config } from '../config'

const verifyToken = (token: string) => {
    try {
        const decodedToken = jwt.verify(token, config.jwt.secret) as any
        return {
            userId: decodedToken.userId,
            role: decodedToken.role,
            permissions: decodedToken.permissions || {},
        }
    } catch (error) {
        return null
    }
}

export const authorize =
    ({ role, permission }: { role?: string; permission?: string }) =>
    (req: Request, res: Response, next: NextFunction) => {
        //Here, if req.headers.authorization is undefined, then token will be set to an empty string ('') by the nullish coalescing operator. This ensures that token always has a string value, even if req.headers.authorization is undefined.

        try {
            const token = req.headers.authorization?.split(' ')[1]
            const requestUser = verifyToken(token as string)
            if (!requestUser) {
                return res
                    .status(401)
                    .json({ status: false, message: 'Unauthorized' })
            }
            if (role && requestUser.role !== role) {
                return res.status(401).json({
                    status: false,
                    message: 'You are not authorized',
                })
            }

            if (permission && !requestUser.permissions[permission]) {
                return res.status(401).json({
                    status: false,
                    message: 'You are not authorized',
                })
            }

            req.body.requestUser = requestUser
            next()
        } catch (error) {
            return res.status(401).json({
                status: false,
                message: 'You are not authorized',
            })
        }
    }

export const authorizeAdmin = authorize({ role: 'admin' })
