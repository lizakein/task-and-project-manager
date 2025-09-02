import { ProjectsSection } from './ProjectsSection';
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

export function Sidepanel({ setProjectId, projects }) {
  return (
    <aside className='sidepanel'>
      <SidepanelMenu />

      <ProjectsSection setProjectId={setProjectId} projects={projects} />
    </aside>
  );
}