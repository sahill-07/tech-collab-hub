import React, { useState } from 'react';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase-config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DeleteButton = ({postId}) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const navigate = useNavigate();
    const handleClick = async() => {
        try{
            const ref = doc(db , "posts" , postId)  
            await deleteDoc(ref);          
            setIsDeleting(true);
            
            navigate("/discussion")
            setTimeout(() => setIsDeleting(false), 3200);
            toast.success("Discussion Deleted");
        }
        catch (err){
            console.log(err)
        }
    };

    return (
<div onClick={handleClick} type="button" class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">Delete</div>

    );
};

export default DeleteButton;
