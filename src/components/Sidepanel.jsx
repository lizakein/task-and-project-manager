import { ProjectsSection } from './ProjectsSection';
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

export function Sidepanel({ setProjectId, setProjects, projects, projectId }) {
  return (
    <aside className='sidepanel'>
      <SidepanelMenu />

      <ProjectsSection setProjectId={setProjectId} setProjects={setProjects} projects={projects} projectId={projectId} />
    </aside>
  );
}