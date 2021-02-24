import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import {connect} from 'react-redux'

const axinstance =axios.create({
    baseURL:'http://localhost:3618/api/'
})

let tt=''
let assessToken = localStorage.getItem('authUser') 
const token = 'Bearer ' + assessToken 
console.log(token)
axinstance.defaults.headers.common['Authorization']=token


axinstance.interceptors.response.use(res =>{
    console.log(res)
    toast.success(res.data.message);
    if(res.config.url == '/login'){
       localStorage.setItem('authUser', res.data.assessToekn)
    }
    return res
 },error =>{
     toast.error(error.response.data.message);
     localStorage.removeItem('authUser')
     return error
 })

 axinstance.interceptors.request.use( (req)=>{
     console.log(req)
     req.headers.Accept={'Content-Type': 'image/jpeg', 'Cache-Control': 'no-cache'}
     req.headers.Authorization=token
    return req
 }
  );



export default axinstance