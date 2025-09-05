import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import axios from 'axios';
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { Homepage } from "./pages/Homepage";
import { EditTaskPage } from "./pages/EditTaskPage/EditTaskPage";
import { useLocalStorage } from "./hooks/useLocalStorage";
import './App.css';

function App() {
  const [ projects, setProjects] = useLocalStorage("projects", []);
  const [ tasks, setTasks ] = useLocalStorage("tasks", []);

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

    useEffect(() => {
      if (!tasks.length) {
        const fetchTasksData = async () => {
          const response = await axios.get('/src/data/tasks.json');
          setTasks(response.data);
        };
  
        fetchTasksData();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

  return (
    <Routes>
      <Route index element={<Homepage projects={projects} setProjects={setProjects} />} />
      <Route path="/project/:projectId" element={<ProjectPage projects={projects} setProjects={setProjects} tasks={tasks} setTasks={setTasks} />} />  
      <Route path="/project/:projectId/:taskId" element={<EditTaskPage projects={projects} setProjects={setProjects} tasks={tasks} setTasks={setTasks} />} /> 
    </Routes>   
  )
}

export default App
