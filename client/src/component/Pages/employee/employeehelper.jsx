import axios from 'axios';

export const fetchDepartments = async () => {
  let departments = [];
  try {
    const response = await axios.get('http://localhost:5000/listdepartment', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    if (response.data.ok) {
      departments = response.data.departments;
    }
  } catch (error) {
    console.error('Error fetching departments:', error);
  }
  return departments;
};