import axios from 'axios'
import { RegistrationResponse, User } from 'types/user'

export async function createUser(user: User) {
    const response = await axios.post('http://localhost:4000/register', {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
        password: user.password,
    })
    return response.data as RegistrationResponse
}
