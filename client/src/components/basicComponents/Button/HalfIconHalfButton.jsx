import React from "react";
import PropTypes from 'prop-types';

const HalfIconHalfButton = ({buttonIcon, buttonName, isDisabled}) => {
  return (
    <button className="flex gap-3 items-center bg-blue-500 text-base px-0.5 text-white shadow-lg hover:shadow-2xl rounded-sm hover:underline " disabled={isDisabled}>
      <span className="bg-white min-h-full text-black px-3 py-3">
        {buttonIcon}
      </span>
      <div className="px-2 flex justify-center w-full">{buttonName}</div>
    </button>
  );
};

HalfIconHalfButton.propTypes = {
  buttonName: PropTypes.string.isRequired, // Making label prop required
  buttonIcon: PropTypes.node,
  
};

HalfIconHalfButton.defaultProps = {
  isDisabled : false
}

export default HalfIconHalfButton;
