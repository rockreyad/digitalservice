import axios from 'axios'
import { User } from 'types/user'

export async function createUser(user: User) {
    const response = await axios.post('http://localhost:4000/user', { user })
    console.log('Response from Server:CreatedUser', response)
    return response.data as User
}
