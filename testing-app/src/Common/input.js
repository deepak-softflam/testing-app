import React from 'react'
import './input.css'
import TextField from '@material-ui/core/TextField';

const input =(props)=>{
    // common input component 
let inputElements =null
switch (props.inputsType) {
    case ('input'):
        inputElements= <TextField
        required
        id="outlined-password-input"
        label={props.placeholder}
        type={props.type}
        autoComplete="current-password"
        variant="outlined"
        className='custome_input'
        onChange={props.onChange}
        name={props.name}
      />
        break;
   
}
    return (
        
        <div className='m-3'>
            {inputElements}
        </div>
    )

};

export default input