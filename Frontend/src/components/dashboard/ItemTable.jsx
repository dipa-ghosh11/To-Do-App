import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';

const ItemTable = ({ items, type, users, projects, onEdit, onDelete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Completed":
      case "Done":
        return "bg-green-100 text-green-800";
      case "In Progress":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderAssignedUsers = (assignedUsers) => {
    if (!assignedUsers || assignedUsers.length === 0) {
      return <span className="text-gray-400 text-xs">No users assigned</span>;
    }

    return (
      <div className="flex flex-wrap gap-1">
        {assignedUsers.map(user => {
          // console.log(user)
          // If user is already populated (has fullName), use it directly
          if (user.fullName) {
            return (
              <span
                key={user._id}
                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
              >
                {user.fullName}
              </span>
            );
          }
          
          // If user is just an ID, find the user in the users array
          const userDetails = users.find(u => u._id === (typeof user === 'string' ? user : user._id));
          if (!userDetails) {
            // console.warn('User not found:', user);
            return null;
          }

          return (
            <span
              key={userDetails._id}
              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {userDetails.fullName}
            </span>
          );
        }).filter(Boolean)}
      </div>
    );
  };

  return (
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Title
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Status
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Dates
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Assigned Users
          </th>
          <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
            Actions
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {items.map((item) => (
          <tr key={item._id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
              <div className="text-sm font-medium text-gray-900">
                {type === "project" ? item.projectTitle : item.taskTitle}
              </div>
              <div className="text-sm text-gray-500">
                {type === "project" ? item.projectDescription : item.taskDescription}
              </div>
              {type === "task" && item.projectId && (
                <div className="text-xs text-gray-400 mt-1">
                  Project: {typeof item.projectId === 'string' 
                    ? projects.find(p => p._id === item.projectId)?.projectTitle 
                    : item.projectId.projectTitle}
                </div>
              )}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                getStatusColor(type === "project" ? item.projectStatus : item.taskStatus)
              }`}>
                {type === "project" ? item.projectStatus : item.taskStatus}
              </span>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <div>Start: {new Date(item.startDate).toLocaleDateString()}</div>
              <div>End: {new Date(item.endDate).toLocaleDateString()}</div>
            </td>
            <td className="px-6 py-4">
              {renderAssignedUsers(item.assignedUsers)}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
              <button
                onClick={() => onEdit(item)}
                className="text-indigo-600 hover:text-indigo-900 mr-3"
              >
                <FiEdit2 className="inline" />
              </button>
              <button
                onClick={() => onDelete(item._id)}
                className="text-red-600 hover:text-red-900"
              >
                <FiTrash2 className="inline" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemTable; 