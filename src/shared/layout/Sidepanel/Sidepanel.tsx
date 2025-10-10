import { ProjectsSection } from '@features/projects';
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

interface SidepanelProps {
  projectId: string | null;
  isOpen: boolean
}

export function Sidepanel({ projectId, isOpen }: SidepanelProps) {
  return (
    <aside className={`sidepanel ${isOpen ? 'sidepanel--open' : ''}`}>
      <SidepanelMenu />

      <ProjectsSection projectId={projectId} />
    </aside>
  );
}