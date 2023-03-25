import { Request, Response } from 'express'
import { create_user, login_user } from '../services/auth'
import { get_user } from '../services/user'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { config } from '../config'

function getErrorStatus(error: any) {
    return error.status || 500
}

const RegisterAnUserWithEmailAndPassword = async (
    req: Request,
    res: Response,
) => {
    const { firstName, lastName, phone, email, password } = req.body

    if (!firstName || !lastName || !phone || !email || !password) {
        //Response: Mandatory fields are missing
        return res
            .status(400)
            .json({ status: false, message: 'Please submit all the filed' })
    }

    const salt = await bcrypt.genSalt(config.bcrypt.saltOrRound)
    const hash = await bcrypt.hash(password, salt)
    let userData = {
        firstName,
        lastName,
        email,
        password: hash,
        phone,
    }

    try {
        //if user already exists
        const duplicateUser = await get_user({ email })

        if (duplicateUser) {
            //Response: User already exists
            return res.status(380).json({
                status: false,
                message: 'Registration Fields! User already exists!',
            })
        }

        const createdUser = await create_user(userData)

        let jwtToken = await jwt.sign(
            {
                userId: createdUser.user_id,
                role: createdUser.role[0]?.role.role_name,
            },
            config.jwt.secret as string,
            { expiresIn: config.jwt.expiresIn },
        )

        const response = {
            status: true,
            message: 'Registration success!',
            data: {
                userId: createdUser.user_id,
                role: createdUser.role[0]?.role.role_name,
                firstName: createdUser.firstName,
                lastName: createdUser.lastName,
                token: jwtToken,
                expiresIn: config.jwt.expiresIn,
            },
        }

        //Response: User created successfully
        return res.status(201).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: 'FAILED',
            message: error,
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

const signInWithEmailAndPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            //Response: Mandatory fields are missing
            return res.status(400).json({
                status: false,
                message: 'Please submit all the filed',
            })
        }
        let userData = {
            email,
            password: String(password),
        }

        const user = await login_user(userData)
        if (!user) {
            //Response: User not exists
            return res
                .status(404)
                .json({ status: false, message: 'User not found!' })
        }
        const validPassword = await bcrypt.compare(
            userData.password,
            user.password,
        )

        if (!validPassword) {
            //Response: Password not Matched
            return res
                .status(401)
                .json({ status: false, message: 'Password is incorrect!' })
        }

        let jwtToken = await jwt.sign(
            {
                userId: user.user_id,
                role: user.role[0]?.role.role_name,
            },
            config.jwt.secret as string,
            { expiresIn: config.jwt.expiresIn },
        )
        const response = {
            status: true,
            message: 'Login success!',
            data: {
                userId: user.user_id,
                role: user.role[0]?.role.role_name,
                firstName: user.firstName,
                lastName: user.lastName,
                token: jwtToken,
                expiresIn: config.jwt.expiresIn,
            },
        }

        //Response: Login success
        return res.status(200).json(response)
    } catch (error: unknown) {
        let status: number = getErrorStatus(error)

        let responseData = {
            status: false,
            message: 'Authentication Field',
        }

        //Response: Error
        res.status(status || 500).json(responseData)
    }
}

export { RegisterAnUserWithEmailAndPassword, signInWithEmailAndPassword }
