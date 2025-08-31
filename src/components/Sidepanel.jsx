import { ProjectsSection } from './ProjectsSection';
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

export function Sidepanel() {
  return (
    <aside className='sidepanel'>
      <SidepanelMenu />

      <ProjectsSection />
    </aside>
  );
}