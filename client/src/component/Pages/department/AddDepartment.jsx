import React, { useEffect, useState } from 'react'
import '../employee/employee.css'
import { fetchDepartments } from '../employee/employeehelper';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Add() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    position: '',
    address: '',
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
          name: '',
          email: '',
          phone: '',
          department: '',
          position: '',
          address: '',
          role: '',
          image: null
        });
        setTimeout(() => {
          navigate('/Departmentlist');
        }, 1200);
      } else {
        throw new Error('Failed to add employee');
      }
    } catch (error) {
      setSuccess(false);
      alert('Error registering employee');
    }
  };

  return (
    <div className="employee-form-bg">
      <div className="employee-form-container">
        <h2 className="employee-form-title">Employee Registration</h2>
        <form onSubmit={handleSubmit} className="employee-form" encType="multipart/form-data">
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