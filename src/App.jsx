import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { useStore } from "./store/useStore";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { Homepage } from "./pages/Homepage";
import { EditTaskPage } from "./pages/EditTaskPage/EditTaskPage";
import './App.css';

function App() {
  const { loadProjects, loadTasks } = useStore();

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, [loadProjects, loadTasks]);


  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path="/project/:projectId" element={<ProjectPage />} />  
      <Route path="/project/:projectId/:taskId" element={<EditTaskPage />} /> 
    </Routes>   
  )
}

export default App
