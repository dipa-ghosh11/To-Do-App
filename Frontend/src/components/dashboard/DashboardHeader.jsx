// import React from 'react';

// const DashboardHeader = ({ title }) => {
//   return (
//     <header className="bg-white shadow-sm">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//         <h1 className="text-3xl font-semibold text-gray-900">{title}</h1>
//       </div>
//     </header>
//   );
// };

// export default DashboardHeader; 






import React from "react";

const DashboardHeader = ({ title }) => {
  return (
    <header className="bg-gradient-to-r from-[#fdfbfb] to-[#ebedee] shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-6 sm:px-8 lg:px-12">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-transparent bg-clip-text tracking-wide font-[Inter]">
          {title}
        </h1>      
      </div>
    </header>
  );
};

export default DashboardHeader;

