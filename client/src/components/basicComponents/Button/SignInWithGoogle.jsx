import React, { useEffect, useState } from 'react'
import googleIcon from '../../../assets/google.png';
import "../../../config/firebase-config";
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithRedirect } from "firebase/auth";

const SignInWithGoogle = ({setIsGoogleSignInDone, isGoogleSignInDone}) => {
  const provider = new GoogleAuthProvider();

  useEffect(()=>{
    onAuthStateChanged(getAuth(), async (user) => {
      if (user !== null) {
        setIsGoogleSignInDone(true);
      }else {
        setIsGoogleSignInDone(false);
      }
    });
  })

  const signIn = async ()=>{
    var currentUser =  getAuth().currentUser;
    console.log(currentUser);
    var auth =  getAuth();
      if(currentUser !== null){
        console.log(currentUser.displayName);
        setIsGoogleSignInDone(true);
      }else{
      signInWithRedirect(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          console.log(user);
          // ...
        }).catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.log(errorMessage);
          // ...
          // console.log("error code is " + errorCode);
        });
      }};
  return (
    <button onClick={signIn} className={`flex gap-2 items-center ${!isGoogleSignInDone ? 'bg-gray-500 hover:shadow-2xl hover:underline':'bg-green-200 cursor-not-allowed'} text-base px-0.5 text-white shadow-lg  rounded-sm `}>
    <img src={googleIcon} alt="" className='bg-white w-7 h-7 p-1'/>
    <div className="px-2 flex justify-center w-full p-1 pr-4">Sign Up with Google</div>
  </button>
  )
}

export default SignInWithGoogle
