import "../../css/main.css";
import "./sidebar.css";
import { Link, useLocation } from "react-router-dom";

type SidebarSmallScreenProps = {
  isSidebarOpen: boolean,
  setIsSidebarOpen: Function,
}
export const SidebarSmallScreen = ({ isSidebarOpen, setIsSidebarOpen }: SidebarSmallScreenProps) => {
  const location = useLocation();
  return (
    <aside
      className={`${
        isSidebarOpen ? "sidebar-small-screen" : "sidebar text-base"
      } `}
    >
      <ul className="list-style-none flex flex-column flex-gap-1">
        <Link
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={`${
            location.pathname === "/home" && "selected"
          } sidebar-item flex flex-align-center flex-gap-1`}
          to="/home"
        >
          <span className="material-icons-outlined ">home</span>
          <span>Home</span>
        </Link>

        <Link
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={`${
            location.pathname === "/label" && "selected"
          } sidebar-item flex flex-align-center flex-gap-1`}
          to="/label"
        >
          <span className="material-icons-outlined ">label</span>
          <span>Labels</span>
        </Link>

        <Link
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={`${
            location.pathname === "/archived" && "selected"
          } sidebar-item flex flex-align-center flex-gap-1`}
          to="/archived"
        >
          <span className="material-icons-outlined ">inventory_2</span>
          <span>Archive</span>
        </Link>

        <Link
          onClick={() => {
            setIsSidebarOpen(!isSidebarOpen);
          }}
          className={`${
            location.pathname === "/trash" && "selected"
          } sidebar-item flex flex-align-center flex-gap-1`}
          to="/trash"
        >
          <span className="material-icons-outlined ">delete</span>
          <span>Trash</span>
        </Link>
        
      </ul>
    </aside>
  );
};
