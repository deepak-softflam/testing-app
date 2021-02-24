import React,{Component} from 'react'
import './register.css'
import {CssBaseline,Container,Grid,TextField} from '@material-ui/core'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LocationCityIcon from '@material-ui/icons/LocationCity';
import LockIcon from '@material-ui/icons/Lock';
import axios from '../../axios_common'

class SingUp extends Component{
    state={
        formValue:{
            fname:'',
            lname:'',
            email:'',
            mobile:'',
            city:'',
            password:''
        },
        rule:{
            required:true
        },
        validation:{
            fname:true,
            lname:true,
            email:true,
            mobile:true,
            city:true,
            password:true
        },
        submit:true
    }

    onHandleChange=(event)=>{
       
        const {value,name}=event.target
        const data=this.state.formValue
        const isvalid = this.checkFormInputValidation(value,this.state.rule)
        const valid=this.state.validation
        if(!isvalid){
            valid[name]=false
            this.setState({submit:true})
            this.setState({validation:valid})
        }else{
            valid[name]=true
            data[name]=value
            this.setState({validation:valid})
            this.setState({formValue:data})
            this.setState({submit:false})
        }
         console.log('event', this.state.submit)
    }


    checkFormInputValidation=(value , rule)=>{
        let isValid = false
         if(rule.required){
             isValid=value.trim() !== '';
         }
         return isValid
     }

    
    onSubmit=()=>{
        axios.post('/newUser',this.state.formValue)
        .then(response=>{
            if(response.status == 200){
                this.props.history.push('/login')
            }
        })
    }

    render(){
        return (

            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md">
            <div>

                <div className="form-row">
                <div className="form-group col-md-6">
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <PersonOutlineIcon />
                    </Grid>
                    <Grid item >
                        <TextField id="input-with-icon-grid" name='fname' onChange={this.onHandleChange}  className="grid-custome"label="First Name" />
                    </Grid>
                    </Grid>
                </div>
                {!this.state.validation.fname ?
              <div className="danger">
                    First Name is required.
                </div>
                :null
                }
                </div>
                <div className="form-group col-md-6">
                 
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <PersonOutlineIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" name='lname' onChange={this.onHandleChange}  className="grid-custome" label="Last Name" />
                    </Grid>
                    </Grid>
                </div>
                {!this.state.validation.lname ?
              <div className="danger">
                    Last Name is required.
                </div>
                :null
                }
                </div>
              </div>

              <div className="form-row">
                <div className="form-group col-md-6">
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <PhoneAndroidIcon />
                    </Grid>
                    <Grid item >
                        <TextField id="input-with-icon-grid" name='mobile' onChange={this.onHandleChange}  className="grid-custome"label="Mobile No" />
                    </Grid>
                    </Grid>
                </div>
                {!this.state.validation.mobile ?
              <div className="danger">
                    Mobile no is required.
                </div>
                :null
                }
                </div>
                <div className="form-group col-md-6">
                 
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <MailOutlineIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" name='email' onChange={this.onHandleChange} className="grid-custome" label="Email Id" />
                    </Grid>
                    </Grid>
                </div>
                {!this.state.validation.email ?
              <div className="danger">
                    Email id is required.
                </div>
                :null
                }

                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6">
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <LocationCityIcon />
                    </Grid>
                    <Grid item >
                        <TextField id="input-with-icon-grid" name='city' onChange={this.onHandleChange}  className="grid-custome"label="City" />
                    </Grid>
                    </Grid>
                </div>
                {!this.state.validation.city ?
              <div className="danger">
                   city is required.
                </div>
                :null
                }
                </div>
                <div className="form-group col-md-6">
                 
                <div>
                    <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                        <LockIcon />
                    </Grid>
                    <Grid item>
                        <TextField id="input-with-icon-grid" name='password' onChange={this.onHandleChange} type={'password'}  className="grid-custome" label="password" />
                    </Grid>
                    </Grid>
                </div>
                {!this.state.validation.password ?
              <div className="danger">
                    password is required.
                </div>
                :null
                }
                </div>
              </div>
             
                <div className='submit-btn'>
              <button type="submit" disabled={this.state.submit } onClick={this.onSubmit} className="btn btn-primary">Submit</button>
                </div>
            </div>
            </Container>
          </React.Fragment>
        )
    }
}

export default SingUp