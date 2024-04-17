import React from 'react'

const Stat = ({title, value, desc}) => {
  return (
    <div className="stats shadow">
  
  <div className="stat">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
    <div className="stat-desc">{desc}</div>
  </div>
  
</div>
  )
}

export default Stat
