import React from 'react';

const DashboardHeader = ({ title }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
      </div>
    </header>
  );
};

export default DashboardHeader; 