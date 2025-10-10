import { useParams } from 'react-router-dom';
import { ProjectHeader } from './ProjectHeader';
import { Layout } from '@layout/Layout';
import { TaskColumn } from '@features/tasks';
import './ProjectPage.css';

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  
  return (
    <Layout>
      <ProjectHeader projectId={projectId || ''} />

      <section className='task-board'>
        <TaskColumn 
          title='To Do' 
          status='todo' 
          projectId={projectId || ''} 
        />
        <TaskColumn 
          title='In progress' 
          status='in-progress' 
          projectId={projectId || ''} 
          />
        <TaskColumn 
          title='Done' 
          status='done' 
          projectId={projectId || ''}
        />
      </section> 
    </Layout>
  );
}