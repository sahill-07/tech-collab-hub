import React, { useEffect, useState } from 'react';
import useFetch from '../Hooks/useFetch';
import { auth } from '../../config/firebase-config';
import { useNavigate } from 'react-router-dom';
import './CSS/Card.css';
import { getRandomImage, imagesArray } from './Image';

const Card = ({ card }) => {
    const navigate = useNavigate();
    const { title, desc, id: postId , username } = card;
    const { data, loading } = useFetch('users');

    const truncateDescription = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength) + '...';
    };

    const randomImage = getRandomImage();
console.log(randomImage); // This will log a random image path from the array

// You can also directly use imagesArray if you need the array of all images
console.log(imagesArray); // This will log the array of all image paths
    const handleClick = (e) => {
        e.stopPropagation(); 
        navigate(`/post/${postId}`);
    };

    return (
        <div className="card lg:">
            <div
                className="card-content m-5 lg:w-[700px] lg:flex lg:flex-col lg:mx-auto text-black p-5 gap-5 rounded-2xl shadow-lg border-2 cursor-pointer border-blue-200 focus:ring-4 focus:outline-none focus:ring-blue-300"
                onClick={handleClick}
            >
                <div className="blue flex flex-row gap-5 p-3 items-center text-black">
                    <img
                        alt="Bonnie image"
                        height="60"
                        src={randomImage}
                        width="60"
                        className="rounded-full shadow-lg"
                    />
                    <h5 className="text-2xl font-medium text-black">{username}</h5>
                </div>

                <div className="flex flex-col gap-3 px-2 lg:px-5 justify-center">
                    <div className="text-3xl">{title}</div>
                    <div className="text-xl">{truncateDescription(desc, 142)}</div>
                </div>
            </div>
        </div>
    );
};

export default Card;
