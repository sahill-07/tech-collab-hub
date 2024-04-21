
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../../config/firebase-config';
import { collection, doc, getDoc, getDocs, query } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const CommentCard = ({ item, postId }) => {
  const { userId , username , commentText, imageUrl } = item;


console.log("UserID" , userId)


  return (
    <div className='rounded-lg shadow-lg m-3'>
        <div className='flex flex-row gap-5 p-3  items-center'>
               <img
                 alt='Bonnie image'
                 height='60'
                 src='/images/people/profile-picture-3.jpg'
                 width='60'
                 className='rounded-full shadow-lg'
               />
               <h5 className='text-2xl font-medium font-poppins'>{username}</h5>
             </div>
              <div className='mx-2 flex flex-col my-5 gap-5'>
                 <div className='text-black text-xl font-poppins lg:mx-5'>{commentText}</div>
                 <div>{imageUrl && <img src={imageUrl} alt='' />}</div>
              </div>
    </div>
  );
};

export default CommentCard;
