import React, { useEffect } from "react";
import Backdrop from '@mui/material/Backdrop';

const ProgressLoading = ({data}) => {
    useEffect(()=>{
        console.log(data);
    })
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <progress
        className="progress bg-blue-600 w-56"
        value={data.percent}
        max="100"
      ></progress>
    </Backdrop>
  );
};

export default ProgressLoading;
