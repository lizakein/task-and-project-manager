import { useState, useEffect } from 'react';
import axios from 'axios';
import { ProjectHeader } from './ProjectHeader';
import { TaskColumn } from './TaskColumn';
import { Header } from "../components/Header";
import { Sidepanel } from "../components/Sidepanel";
import './ProjectPage.css';

export function ProjectPage() {
  const [ projectId, setProjectId] = useState('proj_1');
  const [ projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjectsData = async () => {
      const response = await axios.get('/src/data/projects.json');
      setProjects(response.data);
    };

    fetchProjectsData();
  }, []);

  return (
    <main className='project-page'>
      <Header />
      <Sidepanel setProjectId={setProjectId} projects={projects} />

      <div className='project-content'>
        <ProjectHeader projects={projects} projectId={projectId} />

        <section className='task-board'>
          <TaskColumn title='To Do' status='todo' projectId={projectId} />
          <TaskColumn title='In progress' status='in-progress' projectId={projectId} />
          <TaskColumn title='Done' status='done' projectId={projectId} />
        </section> 
      </div>

         
    </main>
  );
}