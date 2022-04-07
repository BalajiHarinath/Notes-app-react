import "../../css/main.css";
import "./landing.css";
import heroImage from "../../Assets/Images/hero-img.jpg";
import { Link } from "react-router-dom";
import { useScrollToTop, useDocumentTitle } from "../../Utils";

export const Landing = () => {
  useDocumentTitle();
  useScrollToTop();

  return (
    <main className="landing-page-main-small-screen grid-2-column m-3">
      <div className="container-text-landing-page-small-screen flex flex-column flex-justify-space-between text-align-left">
        <h1>
          <span className="title-landing-page">Easy</span> Notes
        </h1>
        <div className="text-hero">
          <h3>
            Your daily journey is coming to{" "}
            <span className="title-landing-page">digital paper</span> now.
          </h3>
          <p>
            Write whatever you lived and what you thought. Manage your daily
            tasks and workflow in a modern way and boost your efficiency without
            any efforts.
          </p>
        </div>
        <div className="flex flex-column flex-gap-1">
          <Link
            className="btn-sign-up-link btn-solid btn-medium text-base flex flex-align-center flex-justify-center"
            to="/signup"
          >
            Join Now{" "}
          </Link>
          <Link className="link-login font-semibold" to="/login">
            Already have an account?
          </Link>
        </div>
      </div>
      <div className="image-container flex flex-justify-center flex-align-center">
        <img
          className="image-hero"
          loading="lazy"
          src={heroImage}
          alt="hero-image"
        />
      </div>
    </main>
  );
};
