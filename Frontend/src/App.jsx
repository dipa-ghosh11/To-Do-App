import './App.css'
import ProjectCard from './components/ProjectCard.jsx'
import AuthPage from './pages/AuthPage.jsx'
import HomePage from './pages/HomePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import UserPage from './pages/UserPage.jsx'

function App() {
  

  return (
    <>
      <Router>
        <ToastContainer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/project" element={<ProjectCard name="Todo" description="ksjncswcw" />} />
          </Routes>
      </Router>
    </>
  )
}

export default App
