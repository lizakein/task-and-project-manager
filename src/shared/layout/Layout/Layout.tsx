import { Header } from "@layout/Header/Header";
import { Sidepanel } from "@layout/Sidepanel/Sidepanel";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./Layout.css";

export function Layout({ children }: { children: React.ReactNode }) {
  const { projectId } = useParams<{ projectId: string }>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="page">
      <Header onMenuToggle={handleMenuToggle} isMenuOpen={isMenuOpen} />
      <Sidepanel projectId={projectId || ""} isOpen={isMenuOpen} />

      <main className="content">{children}</main>
    </div>
  );
}
