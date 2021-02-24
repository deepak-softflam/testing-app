import React,{Component} from 'react'
import {Navbar,Container} from 'react-bootstrap'
import  './navbar.css'
import Typography from '@material-ui/core/Typography';


class SimpleNavBar extends Component {
 render(){
     return (
<Navbar className="nav-div" >
  <div className='title_name'>
  <Typography variant="h1" component="h2" gutterBottom className="mb-0">
                5D
      </Typography>
      <Typography variant="h3" gutterBottom>
      Solutions
      </Typography>
  </div>
  <Navbar.Toggle />
  <Navbar.Collapse className="justify-content-end">
  </Navbar.Collapse>
</Navbar>
     )
 }
}



export default SimpleNavBar

