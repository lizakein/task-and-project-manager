import { Routes, Route } from "react-router-dom";
import { useEffect } from 'react';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { useStore } from "./store/useStore";
import { ProjectPage } from "./pages/ProjectPage/ProjectPage";
import { Homepage } from "./pages/Homepage/Homepage";
import { EditTaskPage } from "./pages/EditTaskPage/EditTaskPage";
import './App.css';
import { CalendarPage } from "./pages/CalendarPage/CalendarPage";
import { AnalyticsPage } from "./pages/AnalyticsPage/AnalyticsPage";
import { SettingsPage } from "./pages/SettingsPage/SettingsPage";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";

function App() {
  const { loadProjects, loadTasks } = useStore();

  useEffect(() => {
    loadProjects();
    loadTasks();
  }, [loadProjects, loadTasks]);


  return (
    <DndProvider backend={HTML5Backend}>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/project/:projectId" element={<ProjectPage />} />  
        <Route path="/project/:projectId/:taskId" element={<EditTaskPage />} /> 
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </DndProvider>
  );
}

export default App
