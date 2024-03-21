import { FormControlLabel, Radio, RadioGroup } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';



const MyRadioGroup = ({radioOptions, radioGroupTitle, value, setValue, isDisabled}) => {

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  return (
    <>
    <div className='flex flex-col'>
  {radioGroupTitle}
  <RadioGroup value={value} onChange={handleChange} row>
    {radioOptions.map((ele, ind) => (
      <FormControlLabel
        key={ind}
        disabled={isDisabled}
        value={ele.value}
        control={<Radio className='w-auto h-auto' />}
        label={ele.label}
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
