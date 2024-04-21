import React, { useEffect, useState } from "react";
import { MySnackbar } from "../MySnackbar";
import { useDispatch, useSelector } from "react-redux";
import { setBasicUtilsSlice } from "../../store/BasicUtilsSlice";
import ProgressLoading from "../basicComponents/TextBox/ProgressLoading";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import FirebaseUtils from "../../utils/FirebaseUtils";


const BasicUtils = () => {
  const dispatch = useDispatch();
  const basicUtils = useSelector((state) => state.BasicUtilsSlice);
  const [isOpen, setOpen] = useState(false);
  useEffect(() => {
    if (basicUtils.snackbar !== null && basicUtils.snackbar !== undefined) {
        setOpen(true);
    }
  }, [basicUtils]);

  useEffect(() => {
    dispatch(setBasicUtilsSlice({
      progress_loading : {
        percent : 40,
        maxpercent : 70,
        message : 'Checking Login status...'
      }
    }))
    onAuthStateChanged(getAuth(), async(user)=>{
      FirebaseUtils.handleAuthChange(user);
    })

}, [])
  return (
    <>
      {isOpen && basicUtils.snackbar !== undefined && basicUtils.snackbar !== null  && <MySnackbar
        isOpen={isOpen}
        setOpen={setOpen}
        msg={basicUtils.snackbar === undefined || basicUtils.snackbar === null ? '':basicUtils.snackbar.msg}
        severity={basicUtils.snackbar === undefined || basicUtils.snackbar === null ? '':basicUtils.snackbar.severity}
      />}

      {
        basicUtils.progress_loading !== null && basicUtils.progress_loading !== undefined && basicUtils.progress_loading.maxpercent < 100 && <ProgressLoading data={basicUtils.progress_loading}/>
      }
    </>
  );
};

export default BasicUtils;
