import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import "./Page404.css";

export function Page404({ cart }) {
  return (
    <>
      <Header cart={cart} />

      <div className="page-404">
        <div className="page-404-container">
          <h1>404</h1>
          <p>Oops! The page you're looking for doesn't exist.</p>
          <p
            style={{
              color: "rgb(150, 150, 150)",
              fontSize: "14px",
              marginBottom: "40px",
            }}
          >
            k It might have been moved or deleted.
          </p>
          <Link to="/" className="page-404-button button-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
