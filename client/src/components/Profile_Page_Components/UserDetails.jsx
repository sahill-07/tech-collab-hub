import React from 'react'
import '../../styles/ScrollbarHide.css'

export const UserDetails = ({data}) => {
  
  return (
    <>
     <section className='h-full p-2 px-3 grid grid-cols-2' >
        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Full Name</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{data.username}</h4>
        <hr className='col-span-2 mt-2'/>

        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>College Name</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{data.college_name}</h4>
        <hr className='col-span-2 mt-2'/>
        
        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Semester</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{data.curr_semester}</h4>
        <hr className='col-span-2 mt-2'/>
        
        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Area Of Interest</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{data.area_of_interest.join(', ')}</h4>
        <hr className='col-span-2 mt-2'/>

        <h3 className='text-lg mt-2 overflow-scroll scrollbar-hide'>Tech Stack Interest</h3>
        <h4 className='text-lg mt-2 overflow-scroll scrollbar-hide'>{data.tech_stack_interest.join(', ')}</h4>
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
  // data : {
  //   collegeName : '-'
  // }
};
