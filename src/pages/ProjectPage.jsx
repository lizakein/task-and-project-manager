import { useState } from 'react';
import { ProjectHeader } from './ProjectHeader';
import { TaskColumn } from './TaskColumn';
import { Header } from "../components/Header";
import { Sidepanel } from "../components/Sidepanel";
import './ProjectPage.css';

export function ProjectPage() {
  const [ projectId, setProjectId] = useState('proj_1');

  return (
    <main className='project-page'>
      <Header />
      <Sidepanel setProjectId={setProjectId} />

      <div className='project-content'>
        <ProjectHeader />

        <section className='task-board'>
          <TaskColumn title='To Do' status='todo' projectId={projectId} />
          <TaskColumn title='In progress' status='in-progress' projectId={projectId} />
          <TaskColumn title='Done' status='done' projectId={projectId} />
        </section> 
      </div>

         
    </main>
  );
}