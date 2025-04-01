import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const LogIn = ({ setIsLogin }) => {
    const {
        email,
        role,
        password,
        setEmail,
        setRole,
        setPassword,
        authenticated,
        user,
        setAuthenticated,
        setUser
    } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios
                .post("http://localhost:4000/api/user/login", {
                    email,
                    role,
                    password,
                });

            // console.log(res.data)
                setUser(res.data.data);
                setAuthenticated(true);
            toast.success("User logged in")
            navigate("/user")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>
                <form className="flex flex-col" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={e=>setEmail(e.target.value)}
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e=>setPassword(e.target.value)}
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select className="p-3 rounded mb-4 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        onChange={e => setRole(e.target.value)}>
                        <option value="" hidden>role</option>
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button className="bg-blue-500 p-3 rounded text-white hover:bg-blue-600 transition font-semibold">
                        Login
                    </button>
                    <p className="text-gray-400 mt-4 text-center">
                        Don't have an account?
                        <span
                            className="text-blue-400 cursor-pointer hover:underline ml-1"
                            onClick={() => setIsLogin(false)}
                        >
                            Sign up here
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LogIn;