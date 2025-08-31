import { ProjectHeader } from './ProjectHeader';
import { TaskColumn } from './TaskColumn';
import './ProjectPage.css';

export function ProjectPage() {
  return (
    <main className='project-page'>
      <ProjectHeader />

      <section className='task-board'>
        <TaskColumn title='To Do' count='2' status='to-do' />
        <TaskColumn title='On progress' count='0' status='on-progress' />
        <TaskColumn title='Done' count='0' status='done' />
      </section>    
    </main>
  );
}