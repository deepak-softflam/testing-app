import React,{Component} from 'react'
import './momentList.css'
import Tables from '../../Common/table'
import axios from '../../axios_common'
import {Typography} from '@material-ui/core'
import {connect} from 'react-redux'

class MomentList extends Component {
    state={
        tableData:{
            title:['Sr.No', 'Image','Title', 'Tags' , 'Action'],
            data:[]
        }
    }

    componentDidMount(){
           this.getAllMomentList()
    }
    getAllMomentList=()=>{
        axios.get('/getMomentList').then(response=>{
            const data=this.state.tableData
            data.data=response.data
            this.setState({tableData:data})
        })
    }

    deleteMoment=(event)=>{
        axios.delete(`/deleteMoment/${event._id}`)
        .then(response=>{
            if(response.status == 200 ) this.getAllMomentList()
        })
    }

    UpdateMoment=(event)=>{
        this.props.changeNav('/add-Moment')
        this.props.updateMoment(event)

    }

    render(){
        return (
            <div>
                <Typography variant="h4" className='mb-5' gutterBottom>
                Moment List 
              </Typography>
                <Tables inputsType="table" title={this.state.tableData.title} record={this.state.tableData.data} onUpdate={this.UpdateMoment} onDelete={this.deleteMoment} />
                
            </div>
        )
    }

}

const maptoDispatchProps = dispatch =>{
    return {
        updateMoment: (data) => dispatch({type:'UpdateMoment',data}),
        changeNav: (data) => dispatch({type:'NavChange',data})
    }
  }


export default connect(null, maptoDispatchProps)( MomentList)