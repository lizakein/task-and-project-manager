import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { ProjectPage } from "./pages/ProjectPage";
import { Homepage } from "./pages/Homepage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import './App.css';


function App() {
  const [ projects, setProjects] = useLocalStorage("projects", []);

  useEffect(() => {
      if (!projects.length) {
        const fetchProjectsData = async () => {
          const response = await axios.get('/src/data/projects.json');
          setProjects(response.data);
        };
  
        fetchProjectsData();
      }   
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Routes>
      <Route index element={<Homepage projects={projects} setProjects={setProjects} />} />
      <Route path="/project/:projectId" element={<ProjectPage projects={projects} setProjects={setProjects} />} />   
    </Routes>   
  )
}

export default App
