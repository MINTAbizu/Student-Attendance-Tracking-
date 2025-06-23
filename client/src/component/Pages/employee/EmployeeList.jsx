import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../employee/employee.css';

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/employee', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployees();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Employee List</h2>
      <div className="table-responsive">
        <table className="table table-striped table-bordered align-middle">
          <thead className="table-dark">
            <tr>
              <th>Employee ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              {/* <th>Department</th>
              <th>Position</th>
              <th>Phone</th>
              <th>Date of Birth</th>
              <th>Salary</th>
              <th>Image</th> */}
            </tr>
          </thead>
          <tbody>
            {employees.map(emp => (
              <tr key={emp._id}>
                <td>{emp.employeeid}</td>
                <td>{emp.name}</td>
                <td>{emp.email}</td>
                <td>{emp.role}</td>
                {/* <td>{emp.department?.name || emp.department}</td>
                <td>{emp.position}</td>
                <td>{emp.phone}</td>
                <td>{emp.dateOfBirth ? new Date(emp.dateOfBirth).toLocaleDateString() : ''}</td>
                <td>{emp.salary}</td> */}
                {/* <td>
                  {emp.image && (
                    <img
                      src={`http://localhost:5000/${emp.image.replace('public/', '')}`}
                      alt="Employee"
                      style={{ width: 50, height: 50, objectFit: 'cover', borderRadius: '5px' }}
                    />
                  )}
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeList;