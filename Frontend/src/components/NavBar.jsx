import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({name, path}) => {
  return (
      <nav className="bg-gray-800 shadow-md p-4 w-full fixed top-0 left-0 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400 ml-4">TaskFlow</h1>
          <div className="mr-4">
              <Link to={path}>
                  <button
                      className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-gray-900 transition"
                  >
                      {name}
                  </button>
              </Link>
          </div>
      </nav>
  )
}

export default NavBar