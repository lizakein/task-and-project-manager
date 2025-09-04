import { ProjectsSection } from './ProjectsSection/ProjectsSection'
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

export function Sidepanel({ setProjects, projects, projectId }) {
  return (
    <aside className='sidepanel'>
      <SidepanelMenu />

      <ProjectsSection setProjects={setProjects} projects={projects} projectId={projectId} />
    </aside>
  );
}