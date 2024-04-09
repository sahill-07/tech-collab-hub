import React, { useEffect, useState } from "react";
import { MySnackbar } from "../MySnackbar";
import { useDispatch, useSelector } from "react-redux";
import { setBasicUtilsSlice } from "../../store/BasicUtilsSlice";
import ProgressLoading from "../basicComponents/TextBox/ProgressLoading";

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

      {
        basicUtils.progress_loading !== null && basicUtils.progress_loading.maxpercent < 100 && <ProgressLoading data={basicUtils.progress_loading}/>
      }
    </>
  );
};

export default BasicUtils;
