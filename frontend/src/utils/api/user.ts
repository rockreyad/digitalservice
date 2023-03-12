import axios, { AxiosError } from 'axios'
import { AuthResponse, User } from 'types/user'

export async function createUser(user: User) {
    const response = await axios.post('http://localhost:4000/register', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
    })
    return response.data as AuthResponse
}

export interface UserLoginError {
    message: string
}

export async function loginUser(user: {
    email: string
    password: string
}): Promise<AuthResponse | UserLoginError> {
    try {
        const response = await axios.post('http://localhost:4000/login', {
            email: user.email,
            password: user.password,
        })

        return response.data as AuthResponse
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
            throw error.response?.data
        }
        throw error
    }
}
