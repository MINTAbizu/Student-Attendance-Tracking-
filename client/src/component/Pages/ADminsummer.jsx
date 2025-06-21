import React from 'react'
import { FaUser } from 'react-icons/fa'

function ADminsummer() {
  return (
    <div>
        <h2>Dashbard overview</h2>
        <p>Welcome to the Admin Dashboard! Here you can manage users, view reports, and configure settings.</p>
       <div>
                <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />

                <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
       </div>
    </div>
  )
}

export default ADminsummer
