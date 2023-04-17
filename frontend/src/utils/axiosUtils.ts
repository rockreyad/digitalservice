import axios from 'axios'
import { useRouter } from 'next/router'

const instance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:4000',
})

let token: string | null = null
if (typeof window !== 'undefined') {
    const user = window.localStorage.getItem('user')
    if (user) {
        const { token: storedToken, exp } = JSON.parse(user)
        if (exp && exp < Date.now() / 1000) {
            // token has expired
            // refresh the token if refresh token available
            // or redirect to login page
            const router = useRouter()
            router.push('/login')
        } else {
            token = storedToken
        }
    }
}

instance.interceptors.request.use((config) => {
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        // add CSRF token to headers
        const csrfToken = window.localStorage.getItem('csrfToken')
        if (csrfToken) {
            config.headers['X-CSRF-Token'] = csrfToken
        }
    }
    return config
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // token has expired
            // refresh the token if refresh token available
            // or redirect to login page
            const router = useRouter()
            router.push('/login')
        }
        return Promise.reject(error)
    },
)

export default instance
