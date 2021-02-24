import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
const axinstance =axios.create({
    baseURL:'http://localhost:3618/api/'
})

let tt=''
let assessToken = localStorage.getItem('authUser') 
const token = 'Bearer ' + assessToken 
axinstance.defaults.headers.common['Authorization']=token


axinstance.interceptors.response.use(res =>{
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
    const tok ='Bearer ' + localStorage.getItem('authUser')
     req.headers.Accept={'Content-Type': 'image/jpeg', 'Cache-Control': 'no-cache'}
     req.headers.Authorization=tok
    return req
 }
  );
export default axinstance