import "../../css/main.css";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();
  return (
    <aside className="sidebar text-lg">
      <ul className="list-style-none flex flex-column flex-gap-1">
        <Link
          className={`${
            location.pathname === "/home" && "selected"
          } sidebar-item flex flex-align-center flex-gap-1`}
          to="/home"
        >
          <span className="material-icons-outlined ">home</span>
          <span>Home</span>
        </Link>
        <Link
          className={`${
            location.pathname === "/" && "selected"
          } sidebar-item flex flex-align-center flex-gap-1`}
          to=""
        >
          <span className="material-icons-outlined ">label</span>
          <span>Labels</span>
        </Link>
        <Link
          className={`${
            location.pathname === "/archived" && "selected"
          } sidebar-item flex flex-align-center flex-gap-1`}
          to="/archived"
        >
          <span className="material-icons-outlined ">inventory_2</span>
          <span>Archive</span>
        </Link>
      </ul>
    </aside>
  );
};
