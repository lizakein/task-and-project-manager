import { useParams } from "react-router-dom";
import { ProjectHeader } from "./components/ProjectHeader";
import { Layout } from "@layout/Layout/Layout";
import { TaskColumn } from "@features/tasks";
import { Status, TASK_STATUS } from "@features/tasks";
import "./ProjectPage.css";

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();

  return (
    <Layout>
      <ProjectHeader projectId={projectId || ""} />

      <section className="task-board">
        {Object.entries(TASK_STATUS).map((val) => {
          return (
            <TaskColumn
              key={val[0]}
              title={val[1].label}
              status={val[0] as Status}
              projectId={projectId || ""}
            />
          );
        })}
      </section>
    </Layout>
  );
}
