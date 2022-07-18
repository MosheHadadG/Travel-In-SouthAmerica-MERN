import React from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function SelectBoxAge({ages, setAges}) {
  
  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
    <InputLabel id="demo-select-small">Age</InputLabel>
    <Select
      labelId="demo-select-small"
      id="demo-select-small"
      value={ages}
      label="Age"
      onChange={({ target: { value } }) => setAges(value)}
    >
      <MenuItem value="All">
        <em>None</em>
      </MenuItem >
      <MenuItem value={`18-25`}>18-25</MenuItem>
      <MenuItem value={`26-35`}>26-35</MenuItem>
      <MenuItem value={`36-45`}>36-45</MenuItem>
      <MenuItem value={`46-55`}>46-55</MenuItem>
    </Select>
  </FormControl>
  )
}

export default SelectBoxAge