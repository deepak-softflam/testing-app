import React from 'react'
import { Redirect } from "react-router-dom";
import Login from '../Auth/Login/login'
import Dashboard from '../Component/Dashboard/dashboard'
import MomentList from '../Component/MomentList/moment-List'
import AddMoment from '../Component/New-Monent/newMoment'
 

//unprotected route
const publicRoute=[
    {path:'/login', component:Login},

]

//protected route 
const protectedRoute =[
    {path:'/dashboard', component:Dashboard},
    {path:'/moment-List', component:MomentList},
    {path:'/add-Moment', component:AddMoment},
    { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> }
]

export { publicRoute , protectedRoute}