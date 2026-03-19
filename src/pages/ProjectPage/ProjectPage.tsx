import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProjectHeader } from "./components/ProjectHeader";
import { Layout } from "@layout/Layout/Layout";
import { TaskColumn } from "@features/tasks";
import { Status, TASK_STATUS } from "@features/tasks";
import "./ProjectPage.css";

export function ProjectPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [activeTab, setActiveTab] = useState<Status>("todo");

  return (
    <Layout>
      <ProjectHeader projectId={projectId || ""} />

      <div className="task-tabs">
        {Object.entries(TASK_STATUS).map(([key, val]) => (
          <button
            key={key}
            className={`task-tabs__button ${activeTab === key ? "task-tabs__button--active" : ""}`}
            onClick={() => setActiveTab(key as Status)}
          >
            {val.label}
          </button>
        ))}
      </div>

      <section className="task-board">
        {Object.entries(TASK_STATUS).map(([key, val]) => (
          <div
            key={key}
            className={`task-column__wrapper ${
              activeTab === key ? "task-column__wrapper--active" : ""
            }`}
          >
            <TaskColumn
              title={val.label}
              status={key as Status}
              projectId={projectId || ""}
            />
          </div>
        ))}
      </section>
    </Layout>
  );
}
