import { Header } from "@layout/Header/Header";
import { Sidepanel } from "@layout/Sidepanel/Sidepanel";

export function DevelopmentPageLayout() {
  return(
    <p 
      style={{ 
        height: "100%",
        display: "flex", 
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontSize: "3rem",
        fontWeight: "700",
        color: "var(--text-color)",
      }}
    >
      Page in development
    </p>
  );
} 