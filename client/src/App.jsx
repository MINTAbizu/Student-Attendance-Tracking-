import { Routes, Route, Navigate } from 'react-router-dom'
import Admindashboard from './component/Pages/Admindashboard'
import Login from './component/Pages/Login'
import Private from './component/protectedroute/Private'
import RolebasedRoute from './component/protectedroute/RolebasedRoute'
import Unautorized from './component/Pages/Unautorized'
import Departmentlist from './component/Pages/department/Departmentlist'
import AddDepartment from './component/Pages/department/AddDepartment'

import 'bootstrap/dist/css/bootstrap.min.css';
import EditDepartment from './component/Pages/department/EditDepartment'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Navigate to="admindashboard" />} />
        <Route path="/unautorized" element={<Unautorized/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/admindashboard" element={
          
          <Private> 
            <RolebasedRoute requiredRole={['admin']}> 
          <Admindashboard />
          </RolebasedRoute>
          </Private>
          
          } />
        <Route path="/Departmentlist" element={<Departmentlist/>}/>
        <Route path="/AddDepartment" element={<AddDepartment />} />
             <Route path='/edit-department/:id' element={<EditDepartment />} />
      </Routes>
    </div>
  )
}

export default App