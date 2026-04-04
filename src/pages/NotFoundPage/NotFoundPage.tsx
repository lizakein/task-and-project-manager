import { Layout } from "@layout/Layout/Layout";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <Layout>
      <div className="not-found-page__content">
        <h2 id="not-found-heading" className="not-found-page__title">
          404
        </h2>
        <p className="not-found-page__message">Page not found</p>
        <a
          href="/"
          className="button button--primary not-found-page__link"
          aria-label="Go back to homepage"
        >
          Go to homepage
        </a>
      </div>
    </Layout>
  );
}
