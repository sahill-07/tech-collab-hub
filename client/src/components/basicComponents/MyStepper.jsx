import React from 'react'
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';


const MyStepper = ({allSteps, activeIndex}) => {
  return (
    <Box sx={{ width: '100%' }}>
    <Stepper alternativeLabel>
      {allSteps.map((label, index) => (
        <Step key={label} completed={index <activeIndex} active={index === activeIndex}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  </Box>
  )
}

export default MyStepper
