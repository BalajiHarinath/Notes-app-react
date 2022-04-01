import "../../css/main.css";
import "./footer.css";
import { useAuth } from "../../Context";

export const Footer = () => {
  const { authState, logout } = useAuth();
  const { userName, userEmail } = authState;
  return (
    <footer className="footer flex flex-align-center pdl-6 flex-gap-1">
      <img
        src="https://res.cloudinary.com/diqqf3eq2/image/upload/v1586883417/person-3_ipa0mj.jpg"
        alt="avatar"
        className="avatar-img img-round-xs"
      />
      <div>
        <p className="font-bold">{userName}</p>
        <p className="email-username">{userEmail}</p>
      </div>
      <div className="flex flex-column pdl-2">
        <button className="btn-logout btn-transparent" onClick={() => logout()}>
          <span className="material-icons-outlined text-3xl">logout</span>
        </button>
        <span className="text-sm">Logout</span>
      </div>
    </footer>
  );
};
