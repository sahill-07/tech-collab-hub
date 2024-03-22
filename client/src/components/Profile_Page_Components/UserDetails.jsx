import React from 'react'
import '../../styles/ScrollbarHide.css'

export const UserDetails = ({username, email, githublink, collegeName, semester, tags}) => {
  
  return (
    <>
     <section className='h-full p-2 px-3 grid grid-cols-2' >
        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Full Name</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{username}</h4>
        <hr className='col-span-2 mt-2'/>

        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Email</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{email}</h4>
        <hr className='col-span-2 mt-2'/>
        
        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Github Link</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{githublink}</h4>
        <hr className='col-span-2 mt-2'/>
        
        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>College Name</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{collegeName === null ? '-':collegeName}</h4>
        <hr className='col-span-2 mt-2'/>

        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Semester</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{semester === null ? '-':semester.split('computerEngineeringSemester')}</h4>
        <hr className='col-span-2 mt-2'/>

        {/* <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Books</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{data.BOOKS.length}</h4>
        <hr className='col-span-2 mt-2'/> */}

        {/* <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Repositories</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{data.REPOSITORIES.length}</h4>
        <hr className='col-span-2 mt-2'/> */}


    </section>
    
    </>
  )
}

UserDetails.defaultProps = {
  tags : '-',
  semester : '-',
  collegeName : '-'
};
