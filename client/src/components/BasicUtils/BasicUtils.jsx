import React, { useEffect, useState } from "react";
import { MySnackbar } from "../MySnackbar";
import { useDispatch, useSelector } from "react-redux";
import { setBasicUtilsSlice } from "../../store/BasicUtilsSlice";

const BasicUtils = () => {
  const basicUtils = useSelector((state) => state.BasicUtilsSlice);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    console.log(basicUtils);
    if (basicUtils.snackbar !== null) {
        setOpen(true);
    }
  }, [basicUtils]);

  return (
    <>
      {isOpen && <MySnackbar
        isOpen={isOpen}
        setOpen={setOpen}
        msg={basicUtils.snackbar.msg}
        severity={basicUtils.snackbar.severity}
      />}
    </>
  );
};

export default BasicUtils;
