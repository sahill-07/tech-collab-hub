import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React from 'react'

const MySelectBox = ({semester, setSemester, options, label}) => {
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    setSemester(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  return (
    <>
    <FormControl sx={{ minWidth: 120 }}>
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          required
          onClose={handleClose}
          onOpen={handleOpen}
          value={semester}
          label={label}
          onChange={handleChange}
        >
            <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {
            options.map((ele, index)=>(
                <MenuItem value={ele.value} key={index}>{ele.label}</MenuItem>
            ))
          }
        </Select>
      </FormControl>
    </>
  )
}

export default MySelectBox
