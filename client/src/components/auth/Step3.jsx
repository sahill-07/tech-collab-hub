import React, { useEffect, useState } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";
import Button from "@mui/material/Button";
import MyCheckbox from '../basicComponents/MyCheckbox';
import MyAlertDialog from '../basicComponents/MyAlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { setBasicUtilsSlice } from '../../store/BasicUtilsSlice';
import { postUser } from '../../http';
import { setUserSlice } from '../../store/UserSlice';
import { getAuth } from 'firebase/auth';

const Step3 = ({ setStepperActiveIndex, userData, setUserData }) => {
    const dispatch = useDispatch();
    const [area_of_interest, setarea_of_interest] = useState(userData['area_of_interest']);
    const [experience, setexperience] = useState(userData['experience']);
    const [preferred_learning_resource, setpreferred_learning_resource] = useState(userData['preferred_learning_resource']);
    const [tech_stack_interest, settech_stack_interest] = useState(userData['tech_stack_interest']);
    const [isConfirmationDialogOpen, setisOpenConfirmationDialogOpen] = useState(false);

    const handleConfirmedButtonClicked = ()=>{
        dispatch(setBasicUtilsSlice({
            progress_loading : {
                percent : 10,
                message : "pushing data to database",
                maxpercent : 40 
            }
        }))
        postUser(userData).then(res=>{
            if(res.status === 200){
                dispatch(setUserSlice(res.data))
                dispatch(setBasicUtilsSlice({action : 'makenull'}))
            }
        })
        setisOpenConfirmationDialogOpen(false);
    }


    const handlePrevButtonClick = () => {
        setStepperActiveIndex(1);
      };
    const submitForm = (e) => {
        e.preventDefault();
        if(area_of_interest.length > 0 && preferred_learning_resource.length > 0 && experience.length > 0 && tech_stack_interest.length > 0){
            userData['area_of_interest'] = area_of_interest;
            userData['experience'] = experience;
            userData['preferred_learning_resource'] = preferred_learning_resource;
            userData['tech_stack_interest'] = tech_stack_interest;
            userData['uid'] = getAuth().currentUser.uid;
            setUserData(userData);
            setisOpenConfirmationDialogOpen(true);
        }else{
            dispatch(setBasicUtilsSlice({
                snackbar : {
                    msg : "Please Complete All Fields",
                    severity : 'error'
                  },
            }))
        }
    }
    AOS.init({
        duration: 800,
      });
  return (
    <div data-aos="fade-left">
        <form onSubmit={submitForm} className="max-w-lg flex flex-col gap-2">
            <MyCheckbox checkBoxGroupTitle={questions[0].question} checkBoxOptions={questions[0].options} value={area_of_interest} setValue={setarea_of_interest}/>
            <hr/>
            <MyCheckbox checkBoxGroupTitle={questions[1].question} checkBoxOptions={questions[1].options} value={experience} setValue={setexperience}/>
            <hr/>
            <MyCheckbox checkBoxGroupTitle={questions[2].question} checkBoxOptions={questions[2].options} value={preferred_learning_resource} setValue={setpreferred_learning_resource}/>
            <hr/>
            <MyCheckbox checkBoxGroupTitle={questions[3].question} checkBoxOptions={questions[3].options} value={tech_stack_interest} setValue={settech_stack_interest}/>

        
        <br />
        <div className="flex flex-col gap-1 md:grid md:grid-cols-2 md:gap-2">
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
            Submit
          </Button>
        </div>
        <MyAlertDialog open={isConfirmationDialogOpen} setOpen={setisOpenConfirmationDialogOpen} handleConfirmedButtonClicked={handleConfirmedButtonClicked} content={confirmationDialogContent} title={confirmationDialogTitle}/>
      </form>
    </div>
  )
}


const confirmationDialogContent = `By clicking "Confirm,"  you acknowledge that the information provided is accurate and you are consenting to proceed with the registration process.`;
const confirmationDialogTitle = 'Confirm the action';
const questions = [
    {
        'question' : '1. Which area are you more interested in learning about?',
        'options' : [
            {label : 'Web Development', value : 'Web Development'},
            {label : 'Android Development', value : 'Android Development'},
        ]
    },
    {
        'question' : '2. Do you have any previous experience in these areas?',
        'options' : [
            {label : 'No experience', value : 'No experience'},
            {label : 'Some experience in Web Development', value : 'Some experience in Web Development'},
            {label : 'Some experience in Android Development', value : 'Some experience in Android Development'},
            {label : 'Experienced in both', value : 'Experienced in Web Development and Android Development both'}
        ]
    },
    {
        'question' : '3. What types of learning resources do you prefer?',
        'options' : [
            {label : 'Online tutorials', value : 'Online tutorials'},
            {label : 'Books', value : 'Books'},
            {label : 'Structured courses (online or in-person)', value : 'Structured courses (online or in-person)'},
            {label : 'Hands-on projects', value : 'Hands-on projects'}
        ]
    },
    {
        'question' : '4. Which technologies are you most interested in? (Please select one for web and one for Android)',
        'options' : [
            {label : 'HTML/CSS', value : 'HTML/CSS'},
            { "label": "React Native", "value": "React Native" },
            { "label": "JavaScript", "value": "JavaScript" },
            { "label": "React.js", "value": "React.js" },
            { "label": "Angular", "value": "Angular" },
            { "label": "Java", "value": "Java" },
            { "label": "Kotlin", "value": "Kotlin" },
            { "label": "Flutter", "value": "Flutter" },
        ]
    }
]

export default Step3
