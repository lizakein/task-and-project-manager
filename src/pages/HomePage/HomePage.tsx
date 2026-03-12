import { Layout } from "@layout/Layout/Layout";
import { Statistics } from "@features/statistics";
import { MyTasks } from "@features/tasks";
import { Calendar } from "@features/calendar";
import "./HomePage.css";

export function HomePage() {
  return (
    <Layout>
      <main className="home-page__content">
        <Statistics />
        <MyTasks />
        <Calendar />
      </main>
    </Layout>
  );
}
