// import React, { useState } from 'react'
// import './CommentCard.css'
// import { toast } from 'react-toastify';
// import { addDoc, collection } from 'firebase/firestore';
// import { auth, db, storage } from '../../../config/firebase-config';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
// import useSingleFetch from '../../Hooks/useSingleFetch';
// import LoadingBar from '../../Discussions/LoadingBar/LoadingBar';
// import CommentCard from './CommentCard';

// const AddComment = ({postId}) => {
    
//     const [comment , setComment] = useState("");
//     const [file , setFile] = useState(null);
//     const [commentData , setCommentData] = useState([]);

//     const {data, loading} = useSingleFetch("posts" , postId , "comments")
    
//     console.log(data)
//     const handleFileChange = (e) => {
//         const selectedFile = e.target.files[0];
//         setFile(selectedFile);
//     };

    
//     const writeComment = async() => {
//         try {
//             if(comment === ""){
//                 toast.error("The input field cannot be empty")
//             }

//             let imageUrl = null;
//             if (file) {
//                 const storageRef = ref(storage, `image/${file.name}`);
//                 await uploadBytes(storageRef, file);
//                 imageUrl = await getDownloadURL(storageRef);
//             }

//             const commentRef = collection(db , "posts" , postId , "comments")
//             const user = auth.currentUser;
//             const userId = user ? user.uid : null;
//             await addDoc(commentRef, {
//                 username : user.displayName ,
//                 commentText : comment ,
//                 imageUrl : imageUrl , 
//                 created : Date.now() ,
//                 userId : userId
//             })
//             toast.success("Comment Added Successfully")
//             setComment("")
//             setFile(null)
//         } catch (error) {
//             toast.error(error.message)
//         }   
//     }
//   return (
//         <div className='flex flex-col gap-2'>

//             <div className='text-3xl font-semibold font-poppins'>
//                 Comment 
//             </div>
//             <div class="">
//                     <label for="large-input" class="block mb-2 text-sm font-medium font-poppins text-gray-900">Add your Comment</label>
//                     <input value={comment} onChange={(e) => setComment(e.target.value)} type="text" id="large-input" class="block w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-900  dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
//             </div>
//             <div>
//                 <label class="block text-sm font-medium text-gray-900 font-poppins " for="file_input">Upload file</label>
//                 <input onChange={handleFileChange} class="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400" id="file_input" type="file"/>
//             </div>
//             <div>
//                 <button onClick={writeComment} class="btn"> Submit</button>
//             </div>

//             <hr />

//             <div>
//                 {data.map((item , i) => (
//                     loading ? <LoadingBar/> : <CommentCard item={item} postId={postId} key={i}/>
//                 ))}
//             </div>
//         </div>
//   )

// }

// export default AddComment

import React, { useState } from 'react';
import './CommentCard.css';
import { toast } from 'react-toastify';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db, storage } from '../../../config/firebase-config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import useSingleFetch from '../../Hooks/useSingleFetch';
import LoadingBar from '../../Discussions/LoadingBar/LoadingBar';
import CommentCard from './CommentCard';

const AddComment = ({ postId }) => {
    const [comment, setComment] = useState('');
    const [file, setFile] = useState(null);
    const { data, loading } = useSingleFetch('posts', postId, 'comments');

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
    };

    const writeComment = async () => {
        try {
            if (comment === '') {
                toast.error('The input field cannot be empty');
                return;
            }

            let imageUrl = null;
            if (file) {
                const storageRef = ref(storage, `image/${file.name}`);
                await uploadBytes(storageRef, file);
                imageUrl = await getDownloadURL(storageRef);
            }

            const commentRef = collection(db, 'posts', postId, 'comments');
            const user = auth.currentUser;
            const userId = user ? user.uid : null;
            await addDoc(commentRef, {
                username: user.displayName,
                commentText: comment,
                imageUrl: imageUrl,
                created: Date.now(),
                userId: userId,
            });
            toast.success('Comment Added Successfully');
            setComment('');
            setFile(null);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='flex flex-col gap-2'>
            <div className='text-3xl font-semibold font-poppins'>Comment</div>
            <div className='mb-2'>
                <label htmlFor='comment-input' className='block mb-2 text-sm font-medium font-poppins text-gray-900'>
                    Add your Comment
                </label>
                <input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    type='text'
                    id='comment-input'
                    className='block md:w-60 lg:w-96 p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:border-gray-600 dark:placeholder-gray-900 dark:focus:ring-blue-500 dark:focus:border-blue-500'
                />
            </div>
            <div className='mb-2'>
                <label htmlFor='file-input' className='block text-sm font-medium text-gray-900 font-poppins'>
                    Upload file
                </label>
                <input
                    onChange={handleFileChange}
                    className='block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:border-gray-600 dark:placeholder-gray-400'
                    id='file-input'
                    type='file'
                />
            </div>
            <div>
                <button onClick={writeComment} className='btn'>
                    Submit
                </button>
            </div>
            <hr />
            <div>
                {loading ? (
                    <div>Loading... </div>
                ) : (
                    data.map((item, i) => <CommentCard item={item} postId={postId} key={i} />)
                )}
            </div>
        </div>
    );
};

export default AddComment;
