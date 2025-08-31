import { ProjectsSection } from './ProjectsSection';
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

export function Sidepanel({ setProjectId }) {
  return (
    <aside className='sidepanel'>
      <SidepanelMenu />

      <ProjectsSection setProjectId={setProjectId} />
    </aside>
  );
}