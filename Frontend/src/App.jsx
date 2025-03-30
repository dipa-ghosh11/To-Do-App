import './App.css'
import ProjectCard from './components/ProjectCard.jsx'
import AuthPage from './pages/AuthPage.jsx'
import HomePage from './pages/HomePage.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />}/>
          <Route path="/auth" element={<AuthPage/>}/>
          <Route path="/project" element={<ProjectCard name="Todo" description="ksjncswcw"/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
