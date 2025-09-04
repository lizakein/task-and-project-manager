import { Header } from "../components/Header";
import { Sidepanel } from "../components/Sidepanel";

export function Homepage({ projects, setProjects }) {
  return (
    <>
      <Header />
      <Sidepanel projects={projects} setProjects={setProjects} projectId={null} />
    </>
  );
}