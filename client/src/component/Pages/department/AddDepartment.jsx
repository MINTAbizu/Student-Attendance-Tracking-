import React, { useState } from 'react'
import { FaBuilding, FaInfoCircle } from 'react-icons/fa'
import '../department/department.css' // Create this CSS file
import { Navigate, useNavigate } from 'react-router-dom';

function AddDepartment() {
  const [departmentName, setDepartmentName] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  const Navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate API call
    setSuccess(true);
    setDepartmentName('');
    setDescription('');
    try {
        const response = fetch('http://localhost:5000/department', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
            },
            body: JSON.stringify({
              name: departmentName,
        description,
            }),
        });

        if (response.ok) {
            setSuccess(true);
            setDepartmentName('');
            setDescription('');
            Navigate('/Departmentlist')
            ;
            window.href='/'// Redirect to Department list page
        } else {
            throw new Error('Failed to add department');
        }
        
    } catch (error) {
        
    }

  };

  return (
    <div className="add-department-container">
      <h1 className="animated-title">
        <FaBuilding className="icon" /> Add Department
      </h1>
      <form className="add-department-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="departmentName">
            <FaBuilding className="icon" /> Department Name:
          </label>
          <input
            type="text"
            id="departmentName"
            name="departmentName"
            required
            value={departmentName}
            onChange={e => setDepartmentName(e.target.value)}
            placeholder="Enter department name"
          />
        
        </div>
        <div className="form-group">
          <label htmlFor="description">
            <FaInfoCircle className="icon" /> Description:
          </label>
          <textarea
            id="description"
            name="description"
            required
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Describe the department"
          ></textarea>
        </div>
        <button type="submit" className="animated-btn">
          Add Department
        </button>
        {success && <div className="success-message">Department added successfully!</div>}
      </form>
    </div>
  )
}

export default AddDepartment