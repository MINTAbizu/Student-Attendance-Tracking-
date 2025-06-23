import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Sidebar from '../Sidebar'
import EmployeeList from './EmployeeList';
import '../employee/employee.css'
function List() {
    const [search, setSearch] = useState('');
  return (
    <div>
         <div className='departmentlist flex'>
      <Sidebar/>
      <div className='departmentlist-content flex-1 p-4 md:p-8'>
        <div className='flex justify-end mb-4'>
          <Link to="/addemployee">
            <button className='add-department-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition'>
              Add Employee
            </button>
          </Link>
        </div>
        <div className="mb-6">
          <input
            type="text"
            className="w-full max-w-xs px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder='Search department'
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {/* list  */}
       
      <div></div>
    </div>
    <div className='employelist'>
      <EmployeeList/>
    </div>
     
    </div>
  )
}

export default List
