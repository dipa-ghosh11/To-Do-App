import React, { useState } from "react";
import LogIn from "../components/LogIn.jsx";
import SignUp from "../components/SignUp.jsx";
import { Link } from "react-router-dom";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
            {/* Navbar */}
            <nav className="bg-gray-800 shadow-md p-4 w-full fixed top-0 left-0 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-blue-400 ml-4">TaskFlow</h1>
                <div className="mr-4">
                    <Link to="/">
                        <button
                            className="px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-gray-900 transition"
                        >
                            Back
                        </button>
                    </Link>
                </div>
            </nav>

            {/* Auth Forms */}
            <div className="mt-20">
                {isLogin ? <LogIn setIsLogin={setIsLogin} /> : <SignUp setIsLogin={setIsLogin} />}
            </div>
        </div>
    );
};

export default AuthPage;
