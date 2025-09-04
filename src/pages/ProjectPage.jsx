import { useParams } from 'react-router-dom';
import { ProjectHeader } from './ProjectHeader';
import { TaskColumn } from './TaskColumn';
import { Header } from "../components/Header";
import { Sidepanel } from "../components/Sidepanel";
import './ProjectPage.css';

export function ProjectPage({ projects, setProjects }) {
  const { projectId } = useParams();
  
  return (
    <main className='project-page'>
      <Header />
      <Sidepanel setProjects={setProjects} projects={projects} projectId={projectId} />

      <div className='project-content'>
        <ProjectHeader projects={projects} projectId={projectId} setProjects={setProjects} />

        <section className='task-board'>
          <TaskColumn title='To Do' status='todo' projectId={projectId} />
          <TaskColumn title='In progress' status='in-progress' projectId={projectId} />
          <TaskColumn title='Done' status='done' projectId={projectId} />
        </section> 
      </div>         
    </main>
  );
}