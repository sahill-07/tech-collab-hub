import React, { useEffect } from 'react'
import {FcLink} from 'react-icons/fc';
import * as empty_box from '../../assets/not_found.json';
import Lottie from "lottie-react";

export const LinksSection = ({data}) => {
  useEffect(()=>{
    console.log(data);
    console.log(data.saved_repo);
    // data.saved_repo.map()
  })
  return (
    <>
    <h1 className='text-lg ml-3 text-blue-500 font-semibold mb-1'>Saved Repositories:</h1>
    {data && <section id='display-empty-box-animation-if-no-links'>
      {(data.saved_repo === null || data.saved_repo === undefined || data.saved_repo.length === 0) && <div id="no-activity" className="flex items-center flex-col">
          <Lottie animationData={empty_box} className='h-52'/>
          <h4 className="text-blue-500 font-bold text-lg">No Saved Repositories</h4>
      </div>
      }
    </section>
    }
    { data && 
    <section id='links-display' className='flex gap-2 flex-col'>
        {
          data.saved_repo && data.saved_repo.length > 0 && data.saved_repo.map(linki=>{
          return <div className='flex gap-2 items-center'>
                  <FcLink/>
                  <a href={linki} target='_blank'  className='hover:text-blue-600 underline'> {linki}</a>         
                </div>
          })
        }
    </section>
    }
    </>
  )
}

