import React,{Component} from 'react'
import './newMoment.css'
import {CssBaseline,List,ListItem,ListItemAvatar,Avatar,ListItemText,TextField,Box,Container,InputLabel,InputAdornment,Input,Button,Typography} from '@material-ui/core'
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import ChipInput from 'material-ui-chip-input'
import axios from '../../axios_common'
import { ToastContainer, toast } from 'react-toastify';
import { withRouter } from 'react-router';
import {connect} from 'react-redux'

class NewMoment extends Component {
    state={
        isTitleValid:true,
        istagValid:true,
        isFileValid:true,
        formValue:{
            title:'',
            tabs:[],
        },
        priviewImg:'',
        file:[],
        rule:{
            required:true
        }
    }

    handleFileChange=(event)=>{
        console.log('event', event.target.files)

        if(event.target.files[0].type =='image/png'|| event.target.files[0].type =='image/jpeg'){
            this.setState({isFileValid:true})
            this.setState({ file: event.target.files[0]})
            let reader = new FileReader();
            let file = event.target.files[0];
            reader.onloadend = () => {
                this.setState({
                    priviewImg: reader.result
                });
              }
              reader.readAsDataURL(file)
        }else{
            this.setState({isFileValid:false})
        }
    }

    handelChange=(event)=>{
        const formData= this.state.formValue
        if(event.target){
            const {value , name}=event.target
            const isvalid = this.checkFormInputValidation(value,this.state.rule)
            
            if (!isvalid ) {
                if(name =='title'){
                    this.setState({isTitleValid:false})
                }
            }else{
                if(name =='title'){
                    this.setState({isTitleValid:true})
                }
            }

            formData[name]=value
            this.setState({formValue:formData})
        }else{
            formData.tabs=event
            this.setState({formValue:formData})
            if(this.state.formValue.tabs.length == 0) {
                this.setState({istagValid:false})
            }
        }
    }

    onSubmit=()=>{
        if(this.state.formValue.title &&this.state.formValue.tabs.length > 0){
            const formData = new FormData();
            formData.append('img', this.state.file);
            formData.append('title', this.state.formValue.title)
            formData.append('tag',this.state.formValue.tabs)
            axios.post('/addMoment',formData)
            .then (response=>{
                console.log(this.props)
                 if(response.status == 200) this.props.changeNav('/moment-List')
            })
        }else{
            if(!this.state.formValue.title)this.setState({isTitleValid:false})
            if(this.state.formValue.tabs.length == 0)this.setState({istagValid:false})
        
        }
    }


    checkFormInputValidation=(value , rule)=>{
        let isValid = false
         if(rule.required){
             isValid=value.trim() !== '';
         }
         return isValid
     }

    render(){
        return (
            <React.Fragment>
        <Box color="text.primary" clone>
            <Typography variant="h5" gutterBottom>
                     Add New Moment
            </Typography>
        </Box>
            <CssBaseline  />
            <Container  maxWidth="lg    ">
               <div className="mt-5">

               <div className="form-row">
          <div className="form-group col-md-6">
            <TextField id="standard-basic" label="Title" name="title" onChange={this.handelChange} />
            {!this.state.isTitleValid?
              <div className="danger">
                Title is required.
                </div>
                :null
                }
          </div>
          <div className="form-group col-md-6">
          <ChipInput
                onChange={this.handelChange}
                label="Tags"
                name="tabs"
                />
                   {!this.state.istagValid?
              <div className="danger">
                Tags is required.
                </div>
                :null
                }
          </div>
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
          <List>
      <ListItem>
        <ListItemAvatar>
        <label htmlFor="contained-button-file">Priview</label> 
            {this.state.priviewImg ?  
          <Avatar src={this.state.priviewImg} > 
          </Avatar>
            :null}
        </ListItemAvatar>
        <ListItemText primary={this.state.file.name} secondary={this.state.file.type} />
      </ListItem>
    </List>
          </div>
          <div className="form-group col-md-4 fileUpload mt-5 custome-fileUpload">
          <input
                    accept="image/*"
                    style={{display:'none'}}
                    id="contained-button-file"
                    multiple
                    className="form-control"
                    type="file"
                    onChange={this.handleFileChange}
                    accept="image/x-png,image/gif,image/jpeg"
                />
                <label htmlFor="contained-button-file">
                    <Button variant="contained" color="primary" className="form-control" component="span">
                    Upload
                    </Button>
                </label>
                {!this.state.isFileValid?
              <div className="danger">
                    wrong file selected .
                </div>
                :null
                }
          </div>
     
        </div>
  
       
                <div className='input-text mb-3 mt-5 ' >
                <Button variant="contained" className='mr-5' color="primary" onClick={this.onSubmit} >
                        Submit
                </Button>
                </div>
            </div>
            </Container>
          </React.Fragment>
        )

    }

}

const maptoDispatchProps = dispatch =>{
    return {
        changeNav: (data) => dispatch({type:'NavChange',data})
    }
  }

export default connect(null , maptoDispatchProps)  (NewMoment)