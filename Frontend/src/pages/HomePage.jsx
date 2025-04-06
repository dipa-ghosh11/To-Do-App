import React from "react";
import NavBar from "../components/NavBar.jsx";

const HomePage = () => {

    return (
        <div className="min-h-screen bg-gray-900 text-white">

            <NavBar name="SignUp/LogIn" path="/auth" />

            <header className="text-center py-30 px-6">
                <h2 className="text-5xl font-extrabold">Stay Organized, Stay Productive</h2>
                <p className="text-lg mt-4 text-gray-400">Manage your tasks efficiently with WorkSync</p>
                <button className="mt-6 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition shadow-lg">
                    <a href="/auth">Get Started</a>
                </button>
            </header>
           
            <section className="max-w-4xl mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold text-blue-400">Easy Task Management</h3>
                    <p className="text-gray-400 mt-2">Create, edit, and delete tasks effortlessly.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold text-purple-400">Set Deadlines</h3>
                    <p className="text-gray-400 mt-2">Stay on top of your tasks with reminders.</p>
                </div>
                <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
                    <h3 className="text-xl font-bold text-pink-400">Sync Across Devices</h3>
                    <p className="text-gray-400 mt-2">Access your to-do list from anywhere.</p>
                </div>
            </section>

        </div>
    );
};

export default HomePage;
