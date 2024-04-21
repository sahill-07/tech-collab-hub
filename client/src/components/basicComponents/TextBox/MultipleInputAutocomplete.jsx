import React, { useEffect } from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const MultipleInputAutocomplete = ({options, selectedOptions, setSelectedOptions, placeholder, label}) => {
  return (
    <Autocomplete
        multiple
        id="tags-outlined"
        options={options}
        filterSelectedOptions
        value={selectedOptions} // Set the selected options using state
        onChange={(event, newValue) => {
          setSelectedOptions(newValue); // Update the state with the new selected options
        }}
        sx={{width : 500}}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
          />
        )}
      />
  )
}

export default MultipleInputAutocomplete
