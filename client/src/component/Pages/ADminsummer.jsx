import React from 'react'
import { FaUser } from 'react-icons/fa'
import SummarryCard from './SummarryCard'
// import '../Pages/admin.css'

function ADminsummer() {
  return (
    <div>
        <h2>Dashbard overview</h2>
        <p>Welcome to the Admin Dashboard! Here you can manage users, view reports, and configure settings.</p>
       <div>
               <div className='admindashboardsummer1'>
                 <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
               </div>
                <div className='admindashboardsummer2'>
                  <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                  <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                  <SummarryCard icon={<FaUser/>} text="totalemployee" number={34} />
                  </div>
               
       </div>
    </div>
  )
}

export default ADminsummer
