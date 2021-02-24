import React from 'react'
import TextField from '@material-ui/core/TextField';
import {TableContainer,Table,TableHead,TableCell,TableRow,TableBody,Avatar} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';


const Tables =(props)=>{
    // common input component 
let inputElements =null
switch (props.inputsType) {
    case ('table'):
        inputElements=   <TableContainer >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
                {props.title.map((e,i)=>{
                    return (
                        <TableCell  >{e}</TableCell>
                    )
                })}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.record.map((row,i) => (
              <TableRow key={i}>
                <TableCell component="th" scope="row">
                  {i+1}
                </TableCell>
                <TableCell >
                <Avatar alt="Remy Sharp" src={row.files.fileName}></Avatar>
                    </TableCell>
                <TableCell >{row.title}</TableCell>
                <TableCell >{row.tag}</TableCell>
                <TableCell >    
                    <EditIcon className="mr-4" onClick={()=>props.onUpdate(row)} />
                  
                    <DeleteIcon onClick={()=> props.onDelete(row)} />
                  
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        break;
   
}
    return (
        
        <div className='m-3'>
            {inputElements}
        </div>
    )

};

export default Tables