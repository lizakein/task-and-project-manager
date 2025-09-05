import { ProjectsSection } from './ProjectsSection/ProjectsSection'
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

export function Sidepanel({ projectId }) {
  return (
    <aside className='sidepanel'>
      <SidepanelMenu />

      <ProjectsSection projectId={projectId} />
    </aside>
  );
}