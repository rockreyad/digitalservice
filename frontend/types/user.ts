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
    data?: AuthUserInfo
}

export interface AuthUserInfo {
    userId: string
    role: string
    firstName: string
    lastName: string
    token: string
    expiresIn: string
}

export type UserInfo = {
    userId: string
    firstName: string
    lastName: string
    email: string
    phone: string
}

export interface UserListResponse {
    status: boolean
    message: string
    data?: UserInfo[]
}
