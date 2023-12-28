import React from 'react'

const JobComp = ({by,title, time, url}) => {
  return (
    <div>
        <a href={url}><h4>{title}</h4></a>
        <p><span>{by}</span> <span>{time}</span></p>
    </div>
  )
}

export default JobComp