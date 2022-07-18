import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import './PlanningForm.css'


const initialState = {
  inputBudget: '',
  inputDeparture: '',
  inputReturn: ''
}

function PlanningForm({ addNewPlanningClick }) {
  const [formPlanning, setFormPlanning] = useState(initialState);
  const [wrongMsg, setWrongMsg] = useState(false)

  const handleChange = ({ target: { name: nameInput, value } }) => {

    setFormPlanning({ ...formPlanning, [nameInput]: value })
  }

  const handleClick = (event) => {
    event.preventDefault()
    const { inputBudget, inputDeparture, inputReturn } = formPlanning;
    if (inputBudget && inputDeparture && inputReturn) {
      setWrongMsg(false)
      return formPlanning;
    }
    else {
      setWrongMsg(true);
    }
    return null;
  }

  return (
    <>
      <div className='planning-inputs'>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Budget</InputLabel>
          <OutlinedInput
            type='number'
            name='inputBudget'
            id="outlined-adornment-amount"
            onChange={handleChange}
            value={formPlanning.inputBudget}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Budget"
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            name='inputDeparture'
            label="Departure Date"
            InputLabelProps={{ shrink: true }}
            type="date"
            onChange={handleChange}
            defaultValue={formPlanning.inputBudget}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <TextField
            name="inputReturn"
            label="Return Date"
            InputLabelProps={{ shrink: true }}
            type="date"
            onChange={handleChange}
            defaultValue={formPlanning.inputReturn}
          />
        </FormControl>

      </div>
      {wrongMsg && <h4 className='wrong-msg'>Please enter all fields</h4>}

      <button className="ui secondary button addPlanningBtn"
        onClick={(event) => addNewPlanningClick(handleClick(event))}
        type='submit'>Add a new planning to profile</button>
    </>
  )
}

export default PlanningForm