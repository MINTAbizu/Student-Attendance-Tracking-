import React, { useEffect, useState } from 'react'
import '../employee/employee.css'
import { fetchDepartments } from './employeehelper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
  const [form, setForm] = useState({
    employeeid: '',
    name: '',
    email: '',
    password: '',
    phone: '',
    department: '',
    position: '',
    address: '',
    dateOfBirth: '',
    salary: '',
    role: '',
    image: null
  });
  const [departments, setDepartments] = useState([]);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getDepartments = async () => {
      const deptList = await fetchDepartments();
      setDepartments(deptList);
    };
    getDepartments();
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value) formData.append(key, value);
      });

      const response = await axios.post('http://localhost:5000/employee', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (response.status === 201 || response.data.ok) {
        setSuccess(true);
        setForm({
          employeeid: '',
          name: '',
          email: '',
          password: '',
          phone: '',
          department: '',
          position: '',
          address: '',
          dateOfBirth: '',
          salary: '',
          role: '',
          image: null
        });
        setTimeout(() => {
          setSuccess(false);
          navigate('/Departmentlist');
        }, 1200);
      } else {
        throw new Error('Failed to add employee');
      }
    } catch (error) {
      setSuccess(false);
      // Log error details for debugging
      if (error.response) {
        alert('Error: ' + (error.response.data.message || 'Bad Request'));
        console.error('Backend error:', error.response.data);
      } else {
        alert('Error registering employee');
        console.error(error);
      }
    }
  };

  return (
    <div className="employee-form-bg">
      <div className="employee-form-container">
        <h2 className="employee-form-title">Employee Registration</h2>
        <form onSubmit={handleSubmit} className="employee-form" encType="multipart/form-data">
          <label htmlFor="employeeid">Employee ID</label>
          <input
            id="employeeid"
            type="text"
            name="employeeid"
            value={form.employeeid}
            onChange={handleChange}
            placeholder="Employee ID"
            required
          />

          <label htmlFor="name">Full Name</label>
          <input
            id="name"
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />

          <label htmlFor="phone">Phone</label>
          <input
            id="phone"
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />

          <label htmlFor="department">Department</label>
          <select
            id="department"
            name="department"
            value={form.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name || dept.dep_name}
              </option>
            ))}
          </select>

          <label htmlFor="position">Position</label>
          <input
            id="position"
            type="text"
            name="position"
            value={form.position}
            onChange={handleChange}
            placeholder="Position"
            required
          />

          <label htmlFor="address">Address</label>
          <textarea
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="Address"
            required
            rows={3}
          />

          <label htmlFor="dateOfBirth">Date of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={form.dateOfBirth}
            onChange={handleChange}
            required
          />

          <label htmlFor="salary">Salary</label>
          <input
            id="salary"
            type="number"
            name="salary"
            value={form.salary}
            onChange={handleChange}
            placeholder="Salary"
            required
          />

          <label htmlFor="role">Role</label>
          <select
            id="role"
            name="role"
            value={form.role}
            onChange={handleChange}
            required
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="employee">Employee</option>
            <option value="manager">Manager</option>
          </select>

          <label htmlFor="image">Upload Image</label>
          <input
            id="image"
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
          />
          {form.image && (
            <img
              src={URL.createObjectURL(form.image)}
              alt="Preview"
              className="image-preview"
            />
          )}

          <button
            type="submit"
            className="employee-form-btn"
          >
            Register Employee
          </button>
          {success && <div className="success-message">Employee registered successfully!</div>}
        </form>
      </div>
    </div>
  )
}

export default Add;