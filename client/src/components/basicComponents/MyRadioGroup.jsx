import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@mui/material/Typography';



const MyRadioGroup = ({radioOptions, radioGroupTitle, value, setValue, isDisabled}) => {

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <>
    <div className='flex flex-col'>
    <Typography variant="subtitle1" gutterBottom>{radioGroupTitle}</Typography>
  
  <RadioGroup value={value} onChange={handleChange} className='ml-3'>
    {radioOptions.map((ele, ind) => (
      <FormControlLabel
        key={ind}
        disabled={isDisabled}
        value={ele.value}
        control={<Radio sx={{ marginLeft: 3, padding: 0, }} />}
        label={<Typography variant="subtitle2">{ele.label}</Typography>}
      />
    ))}
  </RadioGroup>
</div>

    </>
  )
}

MyRadioGroup.defaultProps = {
    radioOptions : [],
    isDisabled : false
};

MyRadioGroup.propTypes = {
    radioOptions: PropTypes.array,
    radioGroupTitle: PropTypes.string.isRequired,
};

export default MyRadioGroup
