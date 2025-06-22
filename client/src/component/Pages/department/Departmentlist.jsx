import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import '../department/department.css'
import Sidebar from '../Sidebar'
import axios from 'axios'

function Departmentlist() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/listdepartment', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (response.data.ok) {
          setDepartments(response.data.departments);
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDepartments();
  }, []);

  // Filter departments by search
  const filteredDepartments = departments.filter(dep =>
    dep.dep_name.toLowerCase().includes(search.toLowerCase()) ||
    dep.dep_description.toLowerCase().includes(search.toLowerCase())
  );

  return (
   <div className="bg-gray-50 min-h-screen">
     <div className='departmentlist flex'>
      <Sidebar />
      <div className='departmentlist-content flex-1 p-4 md:p-8'>
        <div className='flex justify-end mb-4'>
          <Link to="/AddDepartment">
            <button className='add-department-btn bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded shadow transition'>
              Add Department
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
    <div className='departmenttablewrapper px-4 md:px-8'>
      <div className="overflow-x-auto bg-white rounded shadow">
      <h1>Department list</h1>
<thead className="bg-blue-100">
  <tr>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">#</th>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Department Name</th>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Description</th>
    <th className="px-4 py-2 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
  </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-100">
  {loading ? (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">Loading...</td>
    </tr>
  ) : filteredDepartments.length === 0 ? (
    <tr>
      <td colSpan="4" className="text-center py-6 text-gray-500">No departments found.</td>
    </tr>
  ) : (
    filteredDepartments.map((dep, idx) => (
      <tr key={dep._id} className="hover:bg-blue-50 transition">
        <td className="px-4 py-2">{idx + 1}</td>
        <td className="px-4 py-2">{dep.dep_name}</td>
        <td className="px-4 py-2">{dep.dep_description}</td>
        <td className="px-4 py-2 flex gap-2">
          <Link to={`/edit-department/${dep._id}`}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded text-xs font-semibold transition">Edit</button>
          </Link>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs font-semibold transition"
            onClick={() => {
              // Add your delete logic here
              alert(`Delete department: ${dep.dep_name}`);
            }}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </div>

      
    </div>
   </div>
  )
}

export default Departmentlist