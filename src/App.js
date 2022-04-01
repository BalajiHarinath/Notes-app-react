import "./App.css";
import "./css/main.css";
import { Routes, Route, useLocation } from "react-router-dom";

import { Landing, SignUp, Login, Home, Archived, ErrorPage } from "./Pages";
import {
  Header,
  Footer,
  RestrictAuth,
  RequireAuth,
  Toast,
  ColorPalette,
} from "./Components";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {location.pathname === "/home" ||
      location.pathname === "/archived" ||
      location.pathname === "/label" ? (
        <Header />
      ) : null}
      <Toast />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/color" element={<ColorPalette />} />

        <Route element={<RestrictAuth />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>

        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/archived" element={<Archived />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {location.pathname === "/home" ||
      location.pathname === "/archived" ||
      location.pathname === "/label" ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;
