import React, { useState } from "react";

const LoginForm = () => {
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
            </form>
        </div>
    );
};

const SignUpForm = () => {
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
            </form>
        </div>
    );
};

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            <div className="mb-4">
                <button
                    className={`px-4 py-2 mr-2 ${isLogin ? "bg-blue-500" : "bg-gray-700"} rounded`}
                    onClick={() => setIsLogin(true)}
                >
                    Login
                </button>
                <button
                    className={`px-4 py-2 ${!isLogin ? "bg-green-500" : "bg-gray-700"} rounded`}
                    onClick={() => setIsLogin(false)}
                >
                    Sign Up
                </button>
            </div>
            {isLogin ? <LoginForm /> : <SignUpForm />}
        </div>
    );
};

export default AuthPage;
