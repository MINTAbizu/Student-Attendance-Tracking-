import React from 'react'
import '../Pages/sidebar.css'
import { FaTachometerAlt, FaUserTie, FaCog, FaSignOutAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Sidebar() {
  return (
    <div>
      <nav className="sidebar">
        <ul>
          <li>
            <a href="/">
              <FaTachometerAlt className="sidebar-icon" /> Dashboard
            </a>
          </li>
          <li>
            <a href="/List">
              <FaUserTie className="sidebar-icon" /> Employee
            </a>
          </li>
            <li>
                <a href="/projects">
                <FaTachometerAlt className="sidebar-icon" /> Projects
                </a>
          <li/>
        
          
          
            



            <a href="/settings">
              <FaCog className="sidebar-icon" /> Settings
            </a>
          </li>
          <li>
            <a href="/logout">
              <FaSignOutAlt className="sidebar-icon" /> Logout
            </a>
          </li>
          
          <li>
              <Link to={'/Departmentlist'}>
                <FaTachometerAlt className="sidebar-icon" /> Department
                </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar