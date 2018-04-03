import axios from 'axios'
import { header } from '../utils/config'
const host = 'http://localhost:3030';
export default {
    user: {
        login: (data) =>
            axios.post(host + '/auth/login', { ...data }),
        signup: (credentials) =>
            axios.post(host + '/auth/signup', { ...credentials }),
        confirmEmail: (token) =>
            axios.post(host + '/auth/confirmation/'`${token}`),
        list: (input) =>
            axios.get(host + `/user?search=${input}`, header())
                .then(response => response.data.requestResult.users)
    }
}