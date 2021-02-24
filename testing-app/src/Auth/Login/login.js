import React, {Component} from 'react'
import  './login.css'
import {CssBaseline,Container,Typography,TextField,InputLabel,Input,InputAdornment,Button } from '@material-ui/core'
import {Row, Col,Form} from 'react-bootstrap'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import axios from '../../axios_common'
import {connect} from 'react-redux'

class Login extends Component{
    state={
        email:'',
        password:'',
        rule:{required:true},
        isvalidemail:true,
        isvalidPassword:true
    }

    handleChange=(event)=>{
        const {value, name}= event.target
        const isvalid = this.checkFormInputValidation(value,this.state.rule)
        if (!isvalid ) {
            if(name =='email'){
                this.setState({isvalidemail:false})
            }else{
                this.setState({isvalidPassword:false})
            }
        }else{
            if(name =='email'){
                this.setState({isvalidemail:true})
            }else{
                this.setState({isvalidPassword:true})
            }
        }
        this.setState({[name]:value})
    }

    checkFormInputValidation=(value , rule)=>{
        let isValid = false
         if(rule.required){
             isValid=value.trim() !== '';
         }
         return isValid
     }

    OnSingin =(event)=>{
        axios.post('/login', this.state)
        .then(response=>{
            if(response.data.data && response.data.assessToekn){
                this.props.onLogin(response.data.data )
                this.props.history.push('/dashboard')
            }
        })
    }

    render(){
        return (
            <React.Fragment>
            <CssBaseline />
            <Container maxWidth="lg">
            <Container className='container-row mt-5'>
                <Row>
                    <Col>
                    <Typography variant="h4" gutterBottom>
                        Sing IN
                    </Typography>
                    </Col>
                </Row>
                </Container>

                <CssBaseline />
                <Container maxWidth="sm">
            <div>

                <div className='input-text mb-3 mt-5' >
                     <InputLabel htmlFor="input-with-icon-adornment">Enter Email ID</InputLabel>
                    <Input className='input-field'
                    name='email'
                    onChange={this.handleChange}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                        <MailOutlineIcon />
                        </InputAdornment>
                    }
                    />
                {!this.state.isvalidemail?
              <div className="danger">
                Email Address is required.
                </div>
                :null
                }
                </div>
                <div className='input-text mb-3 mt-3' >
                     <InputLabel htmlFor="input-with-icon-adornment">Enter Password</InputLabel>
                    <Input className='input-field'
                    name='password'
                     onChange={this.handleChange}
                    id="input-with-icon-adornment"
                    startAdornment={
                        <InputAdornment position="start">
                        <LockOpenIcon />
                        </InputAdornment>
                    }
                    />
                        {!this.state.isvalidPassword ?
              <div className="danger">
                    password is required.
                </div>
                :null
                }
                </div>
                <div className='input-text mb-3 mt-3' >
                <Button variant="contained" color="primary" onClick={this.OnSingin} >
                        Sing IN
                </Button>
                </div>
            </div>
                </Container>
            </Container>
          </React.Fragment>
        )
    }

}

const maptoDispatchProps = dispatch =>{
    return {
        onLogin: (data) => dispatch({type:'login',data})
    }
}

export default connect(null , maptoDispatchProps) (Login);