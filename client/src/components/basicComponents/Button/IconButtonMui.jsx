import React from 'react'
import Button from '@mui/material/Button';

const IconButtonMui = ({icon, text, onClick}) => {
  return (
      <Button
      variant="contained"
      startIcon={icon}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default IconButtonMui
