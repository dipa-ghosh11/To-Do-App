import React from 'react';

const SignUp = ({ setIsLogin }) => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
                <form className="flex flex-col">
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="mb-3">
                        <label className="text-gray-400 block mb-1">Select Role</label>
                        <select className="p-3 w-full rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500">
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400 block mb-1">Account Status</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center text-gray-400">
                                <input type="radio" name="active" value="yes" className="mr-2" /> Active
                            </label>
                            <label className="flex items-center text-gray-400">
                                <input type="radio" name="active" value="no" className="mr-2" /> Inactive
                            </label>
                        </div>
                    </div>
                    <button className="bg-green-500 p-3 rounded text-white hover:bg-green-600 transition font-semibold">
                        Sign Up
                    </button>
                    <p className="text-gray-400 mt-4 text-center">
                        Already have an account?
                        <span
                            className="text-green-400 cursor-pointer hover:underline ml-1"
                            onClick={() => setIsLogin(true)}
                        >
                            Sign in here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default SignUp;
