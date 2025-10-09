import { Header } from "@layout/Header/Header";
import { Sidepanel } from "@layout/Sidepanel/Sidepanel";

export function DevelopmentPageLayout() {
  return(
    <main className="page">
      <Header />
      <Sidepanel projectId={null} />

      <div className="content">
        <p 
          style={{ 
            height: "100%",
            display: "flex", 
            justifyContent: "center",
            alignItems: "center",
            fontSize: "4rem",
            fontWeight: "700",
            color: "var(--text-color)",
          }}
        >Page in development</p>
      </div>
    </main>
  );
} 