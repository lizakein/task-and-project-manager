import { Header } from "@layout/Header/Header";
import { Sidepanel } from "@layout/Sidepanel/Sidepanel";

export function Homepage() {
  return (
    <>
      <Header />
      <Sidepanel projectId={null} />
    </>
  );
}