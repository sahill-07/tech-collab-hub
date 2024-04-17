import React from 'react'
import StatsWith3Col from '../basicComponents/stats/StatsWith3Col'
import Stats from '../basicComponents/stats/Stat'

const Profile3 = ({data}) => {
  const card = [
    {
      title : 'Total Stars',
      value : data.star_earned,
      desc : 'at Github.com'
    },
    {
      title : 'Total Commits',
      value : data.total_commits,
      desc : 'at Github.com'
    },
    {
      title : 'Total Pull requests',
      value : data.total_pull_request,
      desc : 'at Github.com'
    },
    
  ]
  return (
    <div className='flex gap-2 flex-col'>
      <h5>Github Stats :</h5>
      <StatsWith3Col card = {card}/>
    </div>
  )
}

export default Profile3
