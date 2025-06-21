import React from 'react'

function SummarryCard({ icon, text, number }) {
  return (
    <div>
        <div>
            {icon}
        </div>
        <div>
            <h3>{text}</h3>
            <p>{number}</p>
        </div>
      
    </div>
  )
}

export default SummarryCard
