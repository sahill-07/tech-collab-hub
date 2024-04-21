import Lottie from 'lottie-react'
import React from 'react'
import Loadinganimation from '../../assets/loading.json'

const LoadingAnimation = () => {
  return (
    <div className='flex justify-center'>
      <Lottie animationData={Loadinganimation} loop={true} className='h-72 w-auto'/>
    </div>
  )
}

export default LoadingAnimation
