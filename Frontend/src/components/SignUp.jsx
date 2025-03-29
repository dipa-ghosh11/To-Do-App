import React from 'react'

const SignUp = ({setIsLogin }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-2xl font-bold text-white mb-4">Sign Up</h2>
            <form className="flex flex-col">
                <input
                    type="text"
                    placeholder="Full Name"
                    className="p-2 rounded mb-2 bg-gray-700 text-white focus:outline-none"
                />
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
                <select className="p-2 rounded mb-2 bg-gray-700 text-white focus:outline-none">
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                </select>
                <select className="p-2 rounded mb-4 bg-gray-700 text-white focus:outline-none">
                    <option value="yes">Active - Yes</option>
                    <option value="no">Active - No</option>
                </select>
                <button className="bg-green-500 p-2 rounded text-white hover:bg-green-600">
                    Sign Up
                </button>
                <p>Already have account?  <span className=" cursor-pointer" onClick={() => setIsLogin(true)}>Sign in here</span></p>
            </form>
        </div>
    );
};

export default SignUp