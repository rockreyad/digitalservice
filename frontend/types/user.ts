export type User = {
    user_id?: number
    firstName: string
    lastName: string
    email?: string
    phone?: string
    password?: string
}

export type RegistrationResponse = {
    status: boolean
    message: string
    data?: {
        token: string
        expiresIn: string
    }
}
