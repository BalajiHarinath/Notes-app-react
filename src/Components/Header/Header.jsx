import "../../css/main.css";
import "./header.css";
import { useState } from "react";
import { useAuth } from "../../Context";
import { Sidebar } from "../Sidebar/Sidebar";
import { SidebarSmallScreen } from "../Sidebar/SidebarSmallScreen";

export const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { authState, logout } = useAuth();
  const { userName, userEmail } = authState;
  return (
    <nav className="header flex flex-align-center pdl-6 pdr-2">
      <div className="flex flex-align-center">
        <div className="hamburger-small-screen">
          <button
            className="btn-transparent pdr-1"
            onClick={() => {
              setIsSidebarOpen(!isSidebarOpen);
            }}
          >
            <span className="material-icons-outlined text-3xl">menu</span>
          </button>
          <div
            className={`${isSidebarOpen ? "sidebar-display" : "sidebar-hide"}`}
          >
            <button
              className="btn-sidebar-close btn-transparent"
              onClick={() => {
                setIsSidebarOpen(!isSidebarOpen);
              }}
            >
              <span className="material-icons-outlined text-2xl">close</span>
            </button>
            <SidebarSmallScreen
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
            />
          </div>
        </div>

        <h3 className="">
          <span className="title-header">Easy</span> Notes
        </h3>
      </div>

      <div className="nav-profile">
        <img
          src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg"
          alt="avatar"
          className="avatar-img img-round-xs"
        />
        <div>
          <p className="font-bold">{userName}</p>
          <p className="email-username text-base">{userEmail}</p>
        </div>
        <div className="flex flex-column pdl-0-5">
          <button
            className="btn-logout btn-transparent"
            onClick={() => logout()}
          >
            <span className="material-icons-outlined text-3xl">logout</span>
          </button>
          <span className="text-sm">Logout</span>
        </div>
      </div>
    </nav>
  );
};
