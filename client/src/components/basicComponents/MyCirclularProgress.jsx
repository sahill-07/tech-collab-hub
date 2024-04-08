import React from 'react'
import PropTypes from 'prop-types';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const MyCirclularProgress = ({value}) => {
  return (
    <Box sx={{ position: 'relative', display: 'inline-flex' }}>
      <CircularProgress sx={{ color: 'white' }} variant="determinate" value={value} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: 'absolute',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color : '#00000'
        }}
      >
        <Typography variant="caption" component="div" color="white">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  )
}

export default MyCirclularProgress
