
import { deleteDoc, doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../config/firebase-config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import CommentCard from './Comments/CommentCard';
import  AddComment  from './Comments/AddComment';
import backimg from '../../assets/back.png'
import like from '../../assets/love.png'
import useSingleFetch from '../Hooks/useSingleFetch';
import DeleteButton from './DeleteButton';
import { getRandomImage, imagesArray } from './Image';

// Use getRandomImage function to get a random image

const DiscussionsDetails = () => {
    const {postId} = useParams();
    const [post , setPost ] = useState({})
    const [loading , setLoading] = useState(false);
    const navigate = useNavigate();
    const randomImage = getRandomImage();
console.log(randomImage); // This will log a random image path from the array

// You can also directly use imagesArray if you need the array of all images
console.log(imagesArray); // This will log the array of all image paths

    useEffect(() =>{
        const fetchPost = async() =>{
            try{
                const postRef = doc(db , "posts" , postId);
                const getPost = await getDoc(postRef);
                if(getPost.exists()){
                    const postData = getPost.data()
                    setPost({...postData , id:postId});
                }
            }
            catch(err){
                toast.error(err.message)
            }
        }
        if (postId) { // Add conditional check
            fetchPost();
        }
    } , [postId])

    const [isLiked , setLiked] = useState(false)
    const {data} = useSingleFetch("posts" , postId , "likes");
    useEffect(() => {
        setLiked(data && data.findIndex((item) => item.id === post.userId) !== -1);
    }, [data]);
    const handleLikes = async () => {
        try {
            console.log("Like button clicked");
            
            const likeRef = doc(db, "posts", postId, "likes", post.userId);
            console.log("Like reference:", likeRef);
    
            if (isLiked) {
                await deleteDoc(likeRef);
                console.log("Like removed");
            } else {
                await setDoc(likeRef, { userId: post.userId });
                console.log("Like added");
            }
        } catch (error) {
            toast.error("Error performing like operation");
            console.error("Like error:", error);
        }
    };
    

    console.log("post" ,post)


    return (
        <>
            <div className='m-5 border-2 border-blue-200 rounded-md shadow-lg'>
            <div className='flex flex-row lg:gap-[1000px] p-3 items-center '>
                <div className='flex flex-row justify-center items-center gap-3'>
                <img className="w-16 h-16 cursor-pointer" onClick={() => navigate("/discussion")} src={backimg} alt="" srcset="" />
                <img
                    height="60"
                    src={randomImage}
                    width="60"
                    className="rounded-full shadow-lg"
                />
                <h5 className="lg:text-2xl font-poppins font-medium ">{post.username} </h5>
                </div>
                <div className='flex flex-row items-center gap-5 '>
                    <div className='flex flex-row items-center gap-1'>
                        <img onClick={handleLikes} src={like} className='cursor-pointer' alt="" srcset="" />
                        <p>{data?.length}</p>
                    </div>
                    <div>
                        <DeleteButton postId={postId}/>
                    </div>
                </div>
            </div>

                <hr />

                <div className='mx-10 flex flex-col my-5 gap-5'>       
                   <div className='text-black lg:text-5xl font-semibold font-poppins'>
                        {post.title}
                    </div>
                     <div className='text-black lg:text-2xl font-poppins'>
                        {post.desc}
                    </div>
                    <div>
                        {post.postImg && <img src={post.postImg} alt="" />}
                    </div>
                    <div className='flex flex-row items-center gap-5 '>
                        <div className='flex flex-row items-center gap-1'>
                            {/* <button onClick={handleLikes}> <img src={like}className='cursor-pointer' alt="" srcset="" /> */}
                            {/* </button>  */}
                            {/* <p>{data?.length}</p>                            */}
                        </div>
                        <div>
                            {/* <DeleteButton postId={postId}/> */}
                        </div>
                    </div>
                </div>
                    <div className=' mx-auto  rounded-3xl  shadow-2xl p-4'>
                        <AddComment postId= {postId}/>
                 </div>
            </div>
        </>
  )
}

export default DiscussionsDetails
