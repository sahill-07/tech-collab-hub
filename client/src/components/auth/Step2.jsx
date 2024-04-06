import React, { useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "@mui/material/Button";
import MyRadioGroup from "../basicComponents/MyRadioGroup";
import Typography from "@mui/material/Typography";
import MyTextField from "../basicComponents/TextBox/MyTextField";
import { FaUniversity } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setBasicUtilsSlice } from "../../store/BasicUtilsSlice";

const Step2 = ({ setStepperActiveIndex, userData, setUserData }) => {
  const dispatch = useDispatch();
  AOS.init({
    duration: 800,
  });
  const handlePrevButtonClick = () => {
    setStepperActiveIndex(0);
  };
  const [is_currently_a_student, setIs_currently_a_student] = useState(
    userData["is_currently_a_student"]
  );
  const [curr_semester, setCurr_semester] = useState(userData["curr_semester"]);
  const [college_name, setcollege_name] = useState(userData["college_name"]);

  const submitForm = (e) => {
    e.preventDefault();
    if (is_currently_a_student === "" || curr_semester === "") {
      dispatch(
        setBasicUtilsSlice({
          snackbar: {
            msg: "All fields are compulsory",
            severity: "error",
          },
        })
      );
      return;
    }else{
        userData['curr_semester'] = curr_semester; 
        userData['college_name'] = college_name;
        userData['is_currently_a_student'] = is_currently_a_student;
        setUserData(userData);
        setStepperActiveIndex(2);
    }
  };
  return (
    <div data-aos="fade-left">
      <form onSubmit={submitForm} className="max-w-lg flex gap-2 flex-col">
      <Typography className="mt-1" variant="subtitle1" gutterBottom>
          {questions[2].question}
        </Typography>
        <span className="m-1">
          <MyTextField
            endIcon={<FaUniversity />}
            label={questions[2].label}
            variable={college_name}
            setVariable={setcollege_name}
          />
        </span>
        <hr/>
        <MyRadioGroup
          radioGroupTitle={questions[0].question}
          radioOptions={questions[0].options}
          value={is_currently_a_student}
          setValue={setIs_currently_a_student}
        />
        <hr/>
        <MyRadioGroup
          radioGroupTitle={questions[1].question}
          radioOptions={questions[1].options}
          value={curr_semester}
          setValue={setCurr_semester}
        />
        
        <div className="flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-2 mt-1">
          <Button
            color="success"
            variant="outlined"
            className="w-full"
            onClick={handlePrevButtonClick}
          >
            Previous
          </Button>
          <Button
            type="submit"
            color="success"
            variant="contained"
            className="w-full"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
};

const questions = [
  {
    question: "2. Are you currently an engineering student?",
    options: [
      { label: "Yes", value: true },
      { label: "No", value: false },
    ],
  },
  {
    question:
      "3. If you are an engineering student, which semester are you currently in?",
    options: [
      { label: "1st Semester", value: "semester-1" },
      { label: "2nd Semester", value: "semester-2" },
      { label: "3rd Semester", value: "semester-3" },
      { label: "4th Semester", value: "semester-4" },
      { label: "5th Semester", value: "semester-5" },
      { label: "6th Semester", value: "semester-6" },
      { label: "7th Semester", value: "semester-7" },
      { label: "8th Semester", value: "semester-8" },
      { label: "Not applicable/I prefer not to say", value: "NA" },
    ],
  },
  {
    question: "1. What is the name of your college/university?",
    label: "College Name",
  },
];

export default Step2;
