import React from 'react';

const ProjectCard = ({ name, description }) => {
    return (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full mx-auto hover:shadow-xl transition-shadow">
            <h2 className="text-2xl font-bold text-blue-400 mb-3">{name}</h2>
            <p className="text-gray-300 text-sm">{description}</p>
        </div>
    );
};

export default ProjectCard;
