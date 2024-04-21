import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import progress_loading_animation from "../../../assets/animation_template.json";
import Lottie from "lottie-react";
import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";
import MyCircularProgress from '../MyCirclularProgress'

const ProgressLoading = ({ data }) => {
  const [progress, setProgress] = useState(data.percent);
  useEffect(()=>{
    const timer = setInterval(() => {
      setProgress(progress => {
        if(progress >= data.maxpercent)
          clearInterval(timer)
        return (Math.max(progress + 1, data.percent))
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  },[])

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <div className="p-4 shadow-lg bg-slate-100 rounded-md">
        <div className="text-white flex justify-center flex-col overflow-hidden">
          <Lottie animationData={progress_loading_animation} className="h-60 w-60 -mt-10"/>
          {/* <progress className="progress progress-info -mt-12" value={data.percent} max={100}/> */}
          <Box sx={{ width: '100%', marginTop : '-2.5rem' }}>
            <LinearProgress variant="buffer" value={progress} valueBuffer={progress + 10} />
        </Box>
        </div>
        <p className="text-black">{data.message}</p>
      </div>
    </Backdrop>
  );
};

export default ProgressLoading;
