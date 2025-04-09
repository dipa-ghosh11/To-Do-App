// import React from 'react';

// const UserTable = ({ users, onToggleStatus }) => {
//   return (
//     <table className="min-w-full divide-y divide-gray-200">
//       <thead className="bg-gray-50">
//         <tr>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Full Name
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Email
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Role
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Status
//           </th>
//           <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Created At
//           </th>
//           <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
//             Actions
//           </th>
//         </tr>
//       </thead>
//       <tbody className="bg-white divide-y divide-gray-200">
//         {users.map((user) => (
//           <tr key={user._id} className="hover:bg-gray-50">
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm font-medium text-gray-900">{user.fullName}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <div className="text-sm text-gray-500">{user.email}</div>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
//                 {user.role}
//               </span>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap">
//               <span
//                 className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                   user.isActive
//                     ? "bg-green-100 text-green-800"
//                     : "bg-red-100 text-red-800"
//                 }`}
//               >
//                 {user.isActive ? "Active" : "Inactive"}
//               </span>
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//               {new Date(user.createdAt).toLocaleDateString()}
//             </td>
//             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
//               <button
//                 onClick={() => onToggleStatus(user._id, user.isActive)}
//                 className={`px-3 py-1 rounded-md text-sm font-medium ${
//                   user.isActive
//                     ? "bg-red-100 text-red-700 hover:bg-red-200"
//                     : "bg-green-100 text-green-700 hover:bg-green-200"
//                 }`}
//               >
//                 {user.isActive ? "Deactivate" : "Activate"}
//               </button>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// };

// export default UserTable; 



// import React, { useState } from 'react';

// const UserTable = ({ users, onToggleStatus }) => {
//   const [store, setStore]=useState(users);
//   const[data, setData]=useState("");
//   const getData=(e)=>{
//     console.log(e.target.value)
//     setData(e.target.value)
//   }

//   const filterOut=store.filter((curValue)=>{
//     return curValue.fullName.toLowerCase().includes(data)
//   })

//   return (
//     <div className="overflow-x-auto">
//       <input type="text" placeholder='Search here' onChange={getData} />{
        
//       }
//       <table className="min-w-full text-sm border-collapse rounded-xl overflow-hidden shadow-md bg-white">
      
//         <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 uppercase text-xs font-semibold tracking-wider">
//           <tr>
//             <th className="px-6 py-4 text-left">Full Name</th>
//             <th className="px-6 py-4 text-left">Email</th>
//             <th className="px-6 py-4 text-left">Role</th>
//             <th className="px-6 py-4 text-left">Status</th>
//             <th className="px-6 py-4 text-left">Created At</th>
//             <th className="px-6 py-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {users.map((user) => (
//             <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
//               <td className="px-6 py-4 font-medium text-gray-800">{user.fullName}</td>
//               <td className="px-6 py-4 text-gray-600">{user.email}</td>
//               <td className="px-6 py-4">
//                 <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
//                   {user.role}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <span
//                   className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${user.isActive
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-red-100 text-red-700'
//                     }`}
//                 >
//                   {user.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-gray-500">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4 text-right">
//                 <button
//                   onClick={() => onToggleStatus(user._id, user.isActive)}
//                   className={`px-4 py-1.5 rounded-lg text-xs font-medium transition duration-200 ${user.isActive
//                       ? 'bg-red-100 text-red-700 hover:bg-red-200'
//                       : 'bg-green-100 text-green-700 hover:bg-green-200'
//                     }`}
//                 >
//                   {user.isActive ? 'Deactivate' : 'Activate'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserTable;



// import React, { useState } from 'react';
// import { FiSearch } from 'react-icons/fi'; 

// const UserTable = ({ users, onToggleStatus }) => {
//   const [searchTerm, setSearchTerm] = useState("");

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value.toLowerCase());
//   };

//   const filteredUsers = users.filter((user) =>
//     user.fullName.toLowerCase().includes(searchTerm)
//   );

//   return (
//     <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-md">
//       <div className="mb-4 relative w-full max-w-sm">
       
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FiSearch className="text-gray-400" />
//         </div>
     
//         <input
//           type="text"
//           placeholder="Search by name..."
//           onChange={handleSearch}
//           className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
//         />
//       </div>

//       <table className="min-w-full text-sm border-collapse rounded-xl overflow-hidden shadow-md bg-white">
//         <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 uppercase text-xs font-semibold tracking-wider">
//           <tr>
//             <th className="px-6 py-4 text-left">Full Name</th>
//             <th className="px-6 py-4 text-left">Email</th>
//             <th className="px-6 py-4 text-left">Role</th>
//             <th className="px-6 py-4 text-left">Status</th>
//             <th className="px-6 py-4 text-left">Created At</th>
//             <th className="px-6 py-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-100">
//           {filteredUsers.map((user) => (
//             <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
//               <td className="px-6 py-4 font-medium text-gray-800">{user.fullName}</td>
//               <td className="px-6 py-4 text-gray-600">{user.email}</td>
//               <td className="px-6 py-4">
//                 <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
//                   {user.role}
//                 </span>
//               </td>
//               <td className="px-6 py-4">
//                 <span
//                   className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${user.isActive
//                       ? 'bg-green-100 text-green-700'
//                       : 'bg-red-100 text-red-700'
//                     }`}
//                 >
//                   {user.isActive ? 'Active' : 'Inactive'}
//                 </span>
//               </td>
//               <td className="px-6 py-4 text-gray-500">
//                 {new Date(user.createdAt).toLocaleDateString()}
//               </td>
//               <td className="px-6 py-4 text-right">
//                 <button
//                   onClick={() => onToggleStatus(user._id, user.isActive)}
//                   className={`px-4 py-1.5 rounded-lg text-xs font-medium transition duration-200 ${user.isActive
//                       ? 'bg-red-100 text-red-700 hover:bg-red-200'
//                       : 'bg-green-100 text-green-700 hover:bg-green-200'
//                     }`}
//                 >
//                   {user.isActive ? 'Deactivate' : 'Activate'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//           {filteredUsers.length === 0 && (
//             <tr>
//               <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
//                 No users found.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UserTable;


import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

const UserTable = ({ users, onToggleStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const handleStatusFilter = (e) => {
    setStatusFilter(e.target.value);
  };

  const filteredUsers = users.filter((user) => {
    const matchesName = user.fullName.toLowerCase().includes(searchTerm);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && user.isActive) ||
      (statusFilter === 'inactive' && !user.isActive);
    return matchesName && matchesStatus;
  });

  return (
    <div className="overflow-x-auto p-4 bg-white rounded-xl shadow-md">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        {/* Search Box */}
        <div className="relative w-full max-w-sm">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search by name..."
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
          />
        </div>

        {/* Status Filter Dropdown */}
        <select
          value={statusFilter}
          onChange={handleStatusFilter}
          className="w-full md:w-auto px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-indigo-400"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full text-sm border-collapse rounded-xl overflow-hidden shadow-md bg-white">
        <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-800 uppercase text-xs font-semibold tracking-wider">
          <tr>
            <th className="px-6 py-4 text-left">Full Name</th>
            <th className="px-6 py-4 text-left">Email</th>
            <th className="px-6 py-4 text-left">Role</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Created At</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {filteredUsers.map((user) => (
            <tr key={user._id} className="hover:bg-gray-50 transition duration-200">
              <td className="px-6 py-4 font-medium text-gray-800">{user.fullName}</td>
              <td className="px-6 py-4 text-gray-600">{user.email}</td>
              <td className="px-6 py-4">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-purple-700 bg-purple-100 rounded-full">
                  {user.role}
                </span>
              </td>
              <td className="px-6 py-4">
                <span
                  className={`inline-block px-3 py-1 text-xs font-semibold rounded-full ${user.isActive
                    ? 'bg-green-100 text-green-700'
                    : 'bg-red-100 text-red-700'
                    }`}
                >
                  {user.isActive ? 'Active' : 'Inactive'}
                </span>
              </td>
              <td className="px-6 py-4 text-gray-500">
                {new Date(user.createdAt).toLocaleDateString()}
              </td>
              <td className="px-6 py-4 text-right">
                <button
                  onClick={() => onToggleStatus(user._id, user.isActive)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-medium transition duration-200 ${user.isActive
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                >
                  {user.isActive ? 'Deactivate' : 'Activate'}
                </button>
              </td>
            </tr>
          ))}
          {filteredUsers.length === 0 && (
            <tr>
              <td colSpan="6" className="px-6 py-4 text-center text-gray-400">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
