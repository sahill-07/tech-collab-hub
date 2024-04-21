import React, { useEffect } from 'react'
import IconButtonMui from '../basicComponents/Button/IconButtonMui';
import GitHubIcon from '@mui/icons-material/GitHub';

export const Profile1 = ({data}) => {
  
    const imgUrl = 'https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp';
    const handleGithubClick = ()=>{
      window.open(data.githublink)
    }
    
  return (
    <>{
    <section className='flex items-center flex-col w-[100%] h-[100%]'>
        <img src={imgUrl} alt="" className='w-40 rounded-full'/>
        <h2 className='text-2xl mt-2'>
          {data.username}
        </h2>
        <div id='button-div' className='flex gap-2 mt-2'>
            {/* <button className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded hover:shadow-lg '>Follow</button> */}
            <IconButtonMui icon={<GitHubIcon/>} onClick={handleGithubClick} text={'Github'} />
        </div>
        <br/>
    </section>
    }
    </>
  )
}

Profile1.defaultProps = {
  username : ''
};