import React from 'react'
import Navbar from '../components/NavBar'

const UserPage = () => {
  return (
    <div>
      <Navbar name="Logout" path="/auth" logout={true} />
      UserPage
    </div>
  )
}

export default UserPage