import React from 'react';
import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ setIsLogin }) => {
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
    const [name, setName] = useState("");
    const [isActive, setIsActive] = useState(false);
    
        const handleSignup = async (e) => {
            e.preventDefault();
            try {
                const res = await axios
                    .post("http://localhost:4000/api/user/register", {
                        fullName:name,
                        email,
                        role,
                        password,
                        isActive
                    });
    
                    setUser(res.data.data);
                    setAuthenticated(true);
                toast.success("User signed up")

                if (role == "user") {
                    navigate("/user")
                }
                else {
                    navigate("/admin")
                }
                
            } catch (error) {
                toast.error(error.response.data.message, error.response.data.error ? ": "+ error.response.data.error:+"")
            }
        };
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900 p-4">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-sm">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Create an Account</h2>
                <form className="flex flex-col" onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        onChange={e=>setName(e.target.value)}
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={e=>setEmail(e.target.value)}
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={e=>setPassword(e.target.value)}
                        className="p-3 rounded mb-3 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <div className="mb-3">
                        <label className="text-gray-400 block mb-1">Select Role</label>
                        <select className="p-3 w-full rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-green-500" onChange={e => setRole(e.target.value)}>
                            <option value="" hidden>role</option>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="text-gray-400 block mb-1">Account Status</label>
                        <div className="flex space-x-4">
                            <label className="flex items-center text-gray-400">
                                <input type="radio" name="active" value="yes" className="mr-2" onClick={e=>setIsActive(true)} /> Active
                            </label>
                            <label className="flex items-center text-gray-400">
                                <input type="radio" name="active" value="no" className="mr-2" onClick={e => setIsActive(false)} /> Inactive
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
