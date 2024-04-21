import React from "react";
import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";

const MyCheckbox = ({
  checkBoxOptions,
  checkBoxGroupTitle,
  value,
  setValue,
  isDisabled,
}) => {
  const handleChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setValue([...value, name]); // Add the value to the state if checked
    } else {
      setValue(value.filter((option) => option !== name)); // Remove the value from the state if unchecked
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 0 }}>
      <Typography className="mt-1" variant="subtitle1" gutterBottom>
        {checkBoxGroupTitle}
      </Typography>
      <FormGroup>
        {checkBoxOptions.map((opt, index) => {
          return (
            <FormControlLabel
              key={`checkbox-${opt.value}-${index}`}
              control={
                <Checkbox
                  onChange={handleChange}
                  checked={value.includes(opt.value)}
                  name={opt.value}
                  sx={{ marginLeft: 4, padding: 0 }}
                />
              }
              label={opt.label}
            />
          );
        })}
      </FormGroup>
    </Box>
  );
};

MyCheckbox.defaultProps = {
  isDisabled: false,
};

export default MyCheckbox;
