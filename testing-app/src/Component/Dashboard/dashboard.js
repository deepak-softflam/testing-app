import React, {Component} from 'react'
import {CssBaseline,Container,Typography} from '@material-ui/core'
import './dashboard.css'
import MomentList from '../MomentList/moment-List'
import NewMoment from '../New-Monent/newMoment'
import {connect} from 'react-redux'

class Dashboard extends Component{
  render(){
      console.log(this.props)
        return (
     <React.Fragment >
      <CssBaseline />
      <div className="ml-5 root-custome">
      <Container maxWidth="lg">
        {this.props.metaData.currentNav =='/moment-List'?
          <MomentList />
          : this.props.metaData.currentNav =='/add-Moment'?
          <NewMoment />
          :null 
        }
      </Container>
      </div>
    </React.Fragment>
        )
    }
}


const mapStateToProps = state =>{
  return  {
    metaData:state
  }
}

export default connect(mapStateToProps) (Dashboard);