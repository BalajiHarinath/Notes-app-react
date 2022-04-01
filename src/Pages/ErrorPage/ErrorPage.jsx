import "../../css/main.css";
import "./errorPage.css";
import { Link } from "react-router-dom";
import pagenotfound from "../../Assets/Images/page-not-found.jpg.png";

export const ErrorPage = () => {
    return(
        <div>
            <img className="image-error-page" src={pagenotfound} loading="lazy" alt="page-not-found"/>
            <div className="container-text flex flex-column flex-align-center flex-gap-1">
                <p className="font-bold text-2xl">Page Not Found</p>
                <Link className="btn-solid btn-medium text-base flex flex-align-center flex-justify-center" to="/home">Home</Link>
            </div>         
        </div>
    )
}