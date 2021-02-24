import logo from './logo.svg';
import React from 'react'
import './App.css';
import NavBar from './Layout/Navbar/navbar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Switch, BrowserRouter as Router } from "react-router-dom";
import {publicRoute,protectedRoute} from './Router/index'
import AppRoute from './Router/router'
import AdminNavbar from './Layout/AdminNav/adminNav'
import {connect, Connect} from 'react-redux'
import {Typography} from '@material-ui/core'
function App(props) {
  console.log(props)
  return (
    <React.Fragment>
      <div className='app-main-div'>
      {props.metaData.isLogin?
      <AdminNavbar />  
     
      :
    <NavBar />
      }
      </div>
      <div className='main-body-custome mt-5'>
    <Router {...props} >
    <Switch>
        {publicRoute.map((route, idx) => (
          <AppRoute
            path={route.path}
            component={route.component}
            key={idx}
            isAuthProtected={false}
          />
        ))}

        {protectedRoute.map((route, idx) => (
          <AppRoute
            path={route.path}
            component={route.component}
            key={idx}
            isAuthProtected={true}
          />
        ))}
    </Switch>
  </Router>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = state =>{
  return  {
    metaData:state
  }
}

export default connect(mapStateToProps) (App);
