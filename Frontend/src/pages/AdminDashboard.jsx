import React from 'react'
import Navbar from '../components/NavBar.jsx'

const AdminDashboard = () => {
  return (
    <>
          <Navbar name="Logout" path="/auth" logout={true} />
    </>
  )
}

export default AdminDashboard