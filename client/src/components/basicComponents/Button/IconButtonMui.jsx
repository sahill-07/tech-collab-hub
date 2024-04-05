import React from 'react'
import Button from '@mui/material/Button';

const IconButtonMui = ({icon, text}) => {
  return (
      <Button
      variant="contained"
      startIcon={icon}
      onClick={() => {
        // Handle button click
      }}
    >
      {text}
    </Button>
  )
}

export default IconButtonMui
