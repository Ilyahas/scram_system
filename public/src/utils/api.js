import axios from 'axios'
const host= 'http://localhost:3030';
export default {
    user:{
        login:(data)=>
        axios.post(host+'/auth/login',{data}),
        signup:(credentials)=>
        axios.post(host+'/auth/signup', {...credentials})
    }
}