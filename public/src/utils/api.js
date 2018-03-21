import axios from 'axios'
export default {
    user:{
        signup:(credentials)=>
        axios.post('/auth/signup',{credentials}).then(res=>{}),
        login:(data)=>
        axios.post('/auth/login',{data}).then(res=>{})
    }
}