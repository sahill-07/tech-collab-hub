import { IconButton, InputAdornment, TextField } from "@mui/material";
import React from 'react'
import PropTypes from 'prop-types';

const MyTextField = ({ variable, setVariable, label, endIcon, iserror, errormsg, isDisabled}) => {
  return (
    <>
    <TextField
            required
            value={variable}
            onChange={(e) => setVariable(e.target.value)}
            fullWidth
            type="text"
            label={label}
            variant="outlined"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    {endIcon}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            error={iserror}
            helperText={iserror ? errormsg : ""}
            disabled={isDisabled}
          />
    </>
  )
}

MyTextField.defaultProps = {
  iserror: false, // Default error state
  errormsg: '', // Default error message
  isDisabled: false, // Default disabled state
  variable: ''
};

MyTextField.propTypes = {
  label: PropTypes.string.isRequired, // Making label prop required
  variable: PropTypes.string,
  setVariable: PropTypes.func.isRequired,
  endIcon: PropTypes.node.isRequired,
  iserror: PropTypes.bool,
  errormsg: PropTypes.string,
  isDisabled: PropTypes.bool
};

export default MyTextField
