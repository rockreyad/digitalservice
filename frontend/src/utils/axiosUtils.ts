import axios from 'axios'

let token: string | null = null

let BASE_URL = process.env.NEXT_PUBLIC_API_URL as string

if (typeof window !== 'undefined') {
    const user = window.localStorage.getItem('user')
    if (user) {
        const { token: storedToken, exp } = JSON.parse(user)
        if (exp && exp < Date.now() / 1000) {
            // token has expired
            // refresh the token if refresh token available
            // or redirect to login page
            window.location.href = '/login'
        } else {
            token = storedToken
        }
    }
}

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${token}`,
        ...(typeof window !== 'undefined' && {
            'X-CSRF-Token': window.localStorage.getItem('csrfToken'),
        }),
    },
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // token has expired
            // refresh the token if refresh token available
            // or redirect to login page
            window.location.href = '/login'
        }
        return Promise.reject(error)
    },
)

export default instance
