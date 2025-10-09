import { Header } from "@layout/Header/Header";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <main className="page not-found-page" aria-labelledby="not-found-heading">
      <Header />
      <div className="content not-found-page__content">
        <h2 id="not-found-heading" className="not-found-page__title">404</h2>
        <p className="not-found-page__message">Page not found</p>
        <a 
          href="/" 
          className="button not-found-page__link" 
          aria-label="Go back to homepage"
        >
          Go to homepage
        </a>
      </div>
    </main>
  );
}