import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditDepartment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dep, setDep] = useState({ dep_name: '', dep_description: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch department by ID
    axios.get(`http://localhost:5000/department/${id}`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    })
      .then(res => {
        setDep(res.data.department);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    setDep({ ...dep, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.put(`http://localhost:5000/department/${id}`, dep, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    navigate('/departmentlist');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="p-8 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="dep_name"
          value={dep.dep_name}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Department Name"
          required
        />
        <textarea
          name="dep_description"
          value={dep.dep_description}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          placeholder="Description"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Update</button>
      </form>
    </div>
  );
}

export default EditDepartment;