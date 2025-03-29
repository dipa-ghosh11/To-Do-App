import React from 'react'

const LogIn= ({setIsLogin}) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-bold text-white mb-4">Login</h2>
            <form className="flex flex-col">
                <input
                    type="email"
                    placeholder="Email"
                    className="p-2 rounded mb-2 bg-gray-700 text-white focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="p-2 rounded mb-2 bg-gray-700 text-white focus:outline-none"
                />
                <select className="p-2 rounded mb-4 bg-gray-700 text-white focus:outline-none">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <button className="bg-blue-500 p-2 rounded text-white hover:bg-blue-600">
                    Login
                </button>
                <p>Don't have an account? <span className=" cursor-pointer" onClick={() => setIsLogin(false)}>Sign up here</span></p>
            </form>
        </div>
    );
};

export default LogIn