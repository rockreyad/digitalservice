import axios from 'axios'

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: process.env.BASE_URL || 'http://localhost:4000',
})
let token
if (typeof window !== 'undefined') {
    const user = window.localStorage.getItem('user')
    if (user) {
        token = JSON.parse(user)?.token
    }
}
// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = `Bearer ${token}`

export default instance
