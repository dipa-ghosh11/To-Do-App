import React from "react";

const HomePage = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            {/* Navbar */}
            <nav className="bg-gray-800 shadow-md p-4 flex justify-between items-center rounded-b-lg">
                <h1 className="text-2xl font-bold text-blue-400">TaskFlow</h1>
                <div>
                    <button className="mr-4 px-4 py-2 border border-blue-400 text-blue-400 rounded-lg hover:bg-blue-400 hover:text-gray-900 transition">
                        Login
                    </button>
                    <button className="px-4 py-2 bg-blue-400 text-gray-900 rounded-lg hover:bg-blue-500 transition">
                        Sign Up
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <header className="text-center py-20 px-6">
                <h2 className="text-5xl font-extrabold">Stay Organized, Stay Productive</h2>
                <p className="text-lg mt-4 text-gray-400">Manage your tasks efficiently with TaskFlow</p>
                <button className="mt-6 px-6 py-3 bg-purple-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition shadow-lg">
                    Get Started
                </button>
            </header>

            {/* Features Section */}
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