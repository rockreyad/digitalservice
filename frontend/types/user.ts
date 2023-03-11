export type User = {
    user_id?: number
    firstName: string
    lastName: string
    email?: string
    phone?: string
    password?: string
}

export type AuthResponse = {
    status: boolean
    message: string
    data?: {
        userId: string
        role: string
        firstName: string
        lastName: string
        token: string
        expiresIn: string
    }
}
