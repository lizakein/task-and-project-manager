import { ProjectsSection } from '@features/projects';
import { SidepanelMenu } from './SidepanelMenu';
import './Sidepanel.css';

interface SidepanelProps {
  projectId: string | null;
}

export function Sidepanel({ projectId }: SidepanelProps) {
  return (
    <aside className='sidepanel'>
      <SidepanelMenu />

      <ProjectsSection projectId={projectId} />
    </aside>
  );
}