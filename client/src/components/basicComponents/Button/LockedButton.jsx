import React from 'react'
import Button from '@mui/material/Button';

const LockedButton = ({text, icon, onClick}) => {
    return (
        <Button
        variant="outlined"
        color='error'
        startIcon={icon}
        onClick={onClick}
      >
        {text}
      </Button>
    )
}

export default LockedButton
