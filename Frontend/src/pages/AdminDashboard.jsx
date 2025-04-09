// import axios from "axios";
// import React, { useState, useEffect, useContext } from "react";
// import { FiPlus } from "react-icons/fi";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { AuthContext } from "../contexts/AuthContext";
// import Navbar from "../components/NavBar";
// import DashboardHeader from "../components/dashboard/DashboardHeader";
// import DashboardTabs from "../components/dashboard/DashboardTabs";
// import UserTable from "../components/dashboard/UserTable";
// import ItemTable from "../components/dashboard/ItemTable";
// import FormModal from "../components/dashboard/FormModal";

// const AdminDashboard = () => {
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [users, setUsers] = useState([]);
//   const [activeTab, setActiveTab] = useState("projects");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalType, setModalType] = useState("");
//   const [editingItem, setEditingItem] = useState(null);
//   const [selectedProject, setSelectedProject] = useState(null);
//   const [formData, setFormData] = useState({
//     projectTitle: "",
//     projectDescription: "",
//     projectStatus: "Pending",
//     startDate: "",
//     endDate: "",
//     assignedUsers: [],
//     taskTitle: "",
//     taskDescription: "",
//     taskStatus: "To Do",
//     projectId: "",
//   });

//   const { user } = useContext(AuthContext);
  
//   useEffect(() => {
//     fetchProjects();
//     fetchTasks();
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/user/getusers", { withCredentials: true });
//       if (response.data.users) {
//         const activeUsers = response.data.users.filter(user => user.isActive);
//         console.log('Active Users:', activeUsers);
//         setUsers(response.data.users);
//       } else {
//         console.error('No users data in response:', response.data);
//         toast.error("Error fetching users");
//       }
//     } catch (error) {
//       console.error('Error fetching users:', error);
//       toast.error("Error fetching users");
//     }
//   };

//   const fetchProjects = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/project/projects", { withCredentials: true });
//       if (response.data.projects) {
//         const filteredProjects = response.data.projects.filter(project => !project.isDelete);
//         console.log('Projects:', filteredProjects);
//         setProjects(filteredProjects);
//       } else {
//         console.error('No projects data in response:', response.data);
//         toast.error("Error fetching projects");
//       }
//     } catch (error) {
//       console.error('Error fetching projects:', error);
//       toast.error("Error fetching projects");
//     }
//   };

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/task/tasks", { withCredentials: true });
//       if (response.data.tasks) {
//         const filteredTasks = response.data.tasks.filter(task => !task.isDelete);
//         console.log('Tasks:', filteredTasks);
//         setTasks(filteredTasks);
//       } else {
//         console.error('No tasks data in response:', response.data);
//         toast.error("Error fetching tasks");
//       }
//     } catch (error) {
//       console.error('Error fetching tasks:', error);
//       toast.error("Error fetching tasks");
//     }
//   };

//   const handleCreate = async () => {
//     try {
//       if (modalType === "project") {
//         const projectData = {
//           projectTitle: formData.projectTitle,
//           projectDescription: formData.projectDescription,
//           projectStatus: formData.projectStatus,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           assignedUsers: formData.assignedUsers,
//           isDelete: false
//         };
//         await axios.post("http://localhost:4000/api/project/createproject", projectData, { withCredentials: true });
//         fetchProjects();
//       } else {
//         const taskData = {
//           taskTitle: formData.taskTitle,
//           taskDescription: formData.taskDescription,
//           taskStatus: formData.taskStatus,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           projectId: formData.projectId,
//           assignedUsers: formData.assignedUsers,
//           isDelete: false
//         };
//         await axios.post("http://localhost:4000/api/task/createtask", taskData, { withCredentials: true });
//         fetchTasks();
//       }
//       toast.success(`${modalType} created successfully`);
//       handleCloseModal();
//     } catch (error) {
//       toast.error(`Error creating ${modalType}`);
//     }
//   };

//   const handleUpdate = async () => {
//     try {
//       if (modalType === "project") {
//         const projectData = {
//           projectTitle: formData.projectTitle,
//           projectDescription: formData.projectDescription,
//           projectStatus: formData.projectStatus,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           assignedUsers: formData.assignedUsers
//         };
//         await axios.put(`http://localhost:4000/api/project/updateproject/${editingItem._id}`, projectData, { withCredentials: true });
//         fetchProjects();
//       } else {
//         const taskData = {
//           taskTitle: formData.taskTitle,
//           taskDescription: formData.taskDescription,
//           taskStatus: formData.taskStatus,
//           startDate: formData.startDate,
//           endDate: formData.endDate,
//           projectId: formData.projectId,
//           assignedUsers: formData.assignedUsers
//         };
//         await axios.put(`http://localhost:4000/api/task/updatetask/${editingItem._id}`, taskData, { withCredentials: true });
//         fetchTasks();
//       }
//       toast.success(`${modalType} updated successfully`);
//       handleCloseModal();
//     } catch (error) {
//       toast.error(`Error updating ${modalType}`);
//     }
//   };

//   const handleDelete = async (id, type) => {
//     if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
//       try {
//         if (type === "project") {
//           await axios.delete(`http://localhost:4000/api/project/delete/${id}`, { withCredentials: true });
//           fetchProjects();
//         } else {
//           await axios.delete(`http://localhost:4000/api/task/deletetask/${id}`, { withCredentials: true });
//           fetchTasks();
//         }
//         toast.success(`${type} deleted successfully`);
//       } catch (error) {
//         toast.error(`Error deleting ${type}`);
//       }
//     }
//   };

//   const handleOpenModal = (type, item = null) => {
//     setModalType(type);
//     setEditingItem(item);
//     if (item) {
//       if (type === "project") {
//         setFormData({
//           projectTitle: item.projectTitle,
//           projectDescription: item.projectDescription,
//           projectStatus: item.projectStatus,
//           startDate: item.startDate?.split('T')[0] || "",
//           endDate: item.endDate?.split('T')[0] || "",
//           assignedUsers: item.assignedUsers || []
//         });
//       } else {
//         setFormData({
//           taskTitle: item.taskTitle,
//           taskDescription: item.taskDescription,
//           taskStatus: item.taskStatus,
//           startDate: item.startDate?.split('T')[0] || "",
//           endDate: item.endDate?.split('T')[0] || "",
//           projectId: item.projectId,
//           assignedUsers: item.assignedUsers || []
//         });
//       }
//     } else {
//       setFormData({
//         projectTitle: "",
//         projectDescription: "",
//         projectStatus: "Pending",
//         taskTitle: "",
//         taskDescription: "",
//         taskStatus: "To Do",
//         startDate: "",
//         endDate: "",
//         projectId: "",
//         assignedUsers: []
//       });
//     }
//     setIsModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setEditingItem(null);
//     setFormData({
//       projectTitle: "",
//       projectDescription: "",
//       projectStatus: "Pending",
//       taskTitle: "",
//       taskDescription: "",
//       taskStatus: "To Do",
//       startDate: "",
//       endDate: "",
//       projectId: "",
//       assignedUsers: []
//     });
//   };

//   const handleToggleUserStatus = async (userId, currentStatus) => {
//     try {
//       await axios.put(`http://localhost:4000/api/user/updateuser/${userId}`, 
//         { isActive: !currentStatus },
//         { withCredentials: true }
//       );
//       fetchUsers(); // Refresh the users list
//       toast.success("User status updated successfully");
//     } catch (error) {
//       console.log(error)
//       toast.error("Error updating user status");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <ToastContainer />
//       <Navbar name="Logout" path="/auth" logout={true} />
//       <FormModal
//         isOpen={isModalOpen}
//         onClose={handleCloseModal}
//         onSubmit={(e) => {
//           e.preventDefault();
//           editingItem ? handleUpdate() : handleCreate();
//         }}
//         type={modalType}
//         editingItem={editingItem}
//         formData={formData}
//         setFormData={setFormData}
//         users={users}
//         projects={projects}
//         selectedProject={selectedProject}
//       />
//       <DashboardHeader title={"Welcome, "+user.fullName} />

//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

//         <div className="bg-white shadow rounded-lg">
//           <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-semibold text-gray-900">
//                 {activeTab === "projects" ? "Projects" : activeTab === "tasks" ? "Tasks" : "Users"}
//               </h2>
//               {activeTab !== "users" && (
//                 <button
//                   onClick={() => handleOpenModal(activeTab.slice(0, -1))}
//                   className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   <FiPlus className="mr-2" />
//                   Add {activeTab === "projects" ? "Project" : "Task"}
//                 </button>
//               )}
//             </div>

//             <div className="overflow-x-auto">
//               {activeTab === "users" ? (
//                 <UserTable
//                   users={users}
//                   onToggleStatus={handleToggleUserStatus}
//                 />
//               ) : (
//                 <ItemTable
//                   items={activeTab === "projects" ? projects : tasks}
//                   type={activeTab.slice(0, -1)}
//                   users={users}
//                   projects={projects}
//                   onEdit={(item) => handleOpenModal(activeTab.slice(0, -1), item)}
//                   onDelete={(id) => handleDelete(id, activeTab.slice(0, -1))}
//                 />
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;



import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { FiPlus } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../contexts/AuthContext";
import Navbar from "../components/NavBar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardTabs from "../components/dashboard/DashboardTabs";
import UserTable from "../components/dashboard/UserTable";
import ItemTable from "../components/dashboard/ItemTable";
import FormModal from "../components/dashboard/FormModal";

const AdminDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("projects");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    projectTitle: "",
    projectDescription: "",
    projectStatus: "Pending",
    startDate: "",
    endDate: "",
    assignedUsers: [],
    taskTitle: "",
    taskDescription: "",
    taskStatus: "To Do",
    projectId: "",
  });

  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchProjects();
    fetchTasks();
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/user/getusers", { withCredentials: true });
      if (response.data.users) {
        setUsers(response.data.users);
      } else {
        toast.error("Error fetching users");
      }
    } catch (error) {
      toast.error("Error fetching users");
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/project/projects", { withCredentials: true });
      if (response.data.projects) {
        const filteredProjects = response.data.projects.filter(project => !project.isDelete);
        setProjects(filteredProjects);
      } else {
        toast.error("Error fetching projects");
      }
    } catch (error) {
      toast.error("Error fetching projects");
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/task/tasks", { withCredentials: true });
      if (response.data.tasks) {
        const filteredTasks = response.data.tasks.filter(task => !task.isDelete);
        setTasks(filteredTasks);
      } else {
        toast.error("Error fetching tasks");
      }
    } catch (error) {
      toast.error("Error fetching tasks");
    }
  };

  const handleCreate = async () => {
    try {
      if (modalType === "project") {
        const projectData = {
          projectTitle: formData.projectTitle,
          projectDescription: formData.projectDescription,
          projectStatus: formData.projectStatus,
          startDate: formData.startDate,
          endDate: formData.endDate,
          assignedUsers: formData.assignedUsers,
          isDelete: false
        };
        await axios.post("http://localhost:4000/api/project/createproject", projectData, { withCredentials: true });
        fetchProjects();
      } else {
        const taskData = {
          taskTitle: formData.taskTitle,
          taskDescription: formData.taskDescription,
          taskStatus: formData.taskStatus,
          startDate: formData.startDate,
          endDate: formData.endDate,
          projectId: formData.projectId,
          assignedUsers: formData.assignedUsers,
          isDelete: false
        };
        await axios.post("http://localhost:4000/api/task/createtask", taskData, { withCredentials: true });
        fetchTasks();
      }
      toast.success(`${modalType} created successfully`);
      handleCloseModal();
    } catch (error) {
      toast.error(`Error creating ${modalType}`);
    }
  };

  const handleUpdate = async () => {
    try {
      if (modalType === "project") {
        const projectData = {
          projectTitle: formData.projectTitle,
          projectDescription: formData.projectDescription,
          projectStatus: formData.projectStatus,
          startDate: formData.startDate,
          endDate: formData.endDate,
          assignedUsers: formData.assignedUsers
        };
        await axios.put(`http://localhost:4000/api/project/updateproject/${editingItem._id}`, projectData, { withCredentials: true });
        fetchProjects();
      } else {
        const taskData = {
          taskTitle: formData.taskTitle,
          taskDescription: formData.taskDescription,
          taskStatus: formData.taskStatus,
          startDate: formData.startDate,
          endDate: formData.endDate,
          projectId: formData.projectId,
          assignedUsers: formData.assignedUsers
        };
        await axios.put(`http://localhost:4000/api/task/updatetask/${editingItem._id}`, taskData, { withCredentials: true });
        fetchTasks();
      }
      toast.success(`${modalType} updated successfully`);
      handleCloseModal();
    } catch (error) {
      toast.error(`Error updating ${modalType}`);
    }
  };

  const handleDelete = async (id, type) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      try {
        if (type === "project") {
          await axios.delete(`http://localhost:4000/api/project/delete/${id}`, { withCredentials: true });
          fetchProjects();
        } else {
          await axios.delete(`http://localhost:4000/api/task/deletetask/${id}`, { withCredentials: true });
          fetchTasks();
        }
        toast.success(`${type} deleted successfully`);
      } catch (error) {
        toast.error(`Error deleting ${type}`);
      }
    }
  };

  const handleOpenModal = (type, item = null) => {
    setModalType(type);
    setEditingItem(item);
    if (item) {
      if (type === "project") {
        setFormData({
          projectTitle: item.projectTitle,
          projectDescription: item.projectDescription,
          projectStatus: item.projectStatus,
          startDate: item.startDate?.split('T')[0] || "",
          endDate: item.endDate?.split('T')[0] || "",
          assignedUsers: item.assignedUsers || []
        });
      } else {
        setFormData({
          taskTitle: item.taskTitle,
          taskDescription: item.taskDescription,
          taskStatus: item.taskStatus,
          startDate: item.startDate?.split('T')[0] || "",
          endDate: item.endDate?.split('T')[0] || "",
          projectId: item.projectId,
          assignedUsers: item.assignedUsers || []
        });
      }
    } else {
      setFormData({
        projectTitle: "",
        projectDescription: "",
        projectStatus: "Pending",
        taskTitle: "",
        taskDescription: "",
        taskStatus: "To Do",
        startDate: "",
        endDate: "",
        projectId: "",
        assignedUsers: []
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
    setFormData({
      projectTitle: "",
      projectDescription: "",
      projectStatus: "Pending",
      taskTitle: "",
      taskDescription: "",
      taskStatus: "To Do",
      startDate: "",
      endDate: "",
      projectId: "",
      assignedUsers: []
    });
  };

  const handleToggleUserStatus = async (userId, currentStatus) => {
    try {
      await axios.put(`http://localhost:4000/api/user/updateuser/${userId}`,
        { isActive: !currentStatus },
        { withCredentials: true }
      );
      fetchUsers();
      toast.success("User status updated successfully");
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-yellow-100 to-teal-100 animate-fadeIn">
      <ToastContainer />
      <Navbar name="Logout" path="/auth" logout={true} />
      <FormModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={(e) => {
          e.preventDefault();
          editingItem ? handleUpdate() : handleCreate();
        }}
        type={modalType}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        users={users}
        projects={projects}
        selectedProject={selectedProject}
      />
      <DashboardHeader title={`Welcome, ${user.fullName}`} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />

        <div className="bg-white shadow-xl rounded-3xl border border-pink-200 p-6 transition-all hover:shadow-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gradient bg-gradient-to-r from-fuchsia-600 to-indigo-600 bg-clip-text text-transparent">
              {activeTab === "projects" ? "Projects" : activeTab === "tasks" ? "Tasks" : "Users"}
            </h2>
            {activeTab !== "users" && (
              <button
                onClick={() => handleOpenModal(activeTab.slice(0, -1))}
                className="inline-flex items-center px-5 py-2 rounded-full shadow-lg text-sm font-bold text-white bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
              >
                <FiPlus className="mr-2" />
                Add {activeTab === "projects" ? "Project" : "Task"}
              </button>
            )}
          </div>

          <div className="overflow-x-auto">
            {activeTab === "users" ? (
              <UserTable
                users={users}
                onToggleStatus={handleToggleUserStatus}
              />
            ) : (
              <ItemTable
                items={activeTab === "projects" ? projects : tasks}
                type={activeTab.slice(0, -1)}
                users={users}
                projects={projects}
                tasks={tasks}
                onEdit={(item) => handleOpenModal(activeTab.slice(0, -1), item)}
                onDelete={(id) => handleDelete(id, activeTab.slice(0, -1))}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;