import "./App.css";
import "./css/main.css";
import { Routes, Route, useLocation } from "react-router-dom";

import {
  Landing,
  SignUp,
  Login,
  Home,
  Archived,
  ErrorPage,
  LabelPage,
  TrashPage
} from "./Pages";

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
      {/* {location.pathname === "/home" ||
      location.pathname === "/archived" ||
      location.pathname === "/label" ||
      location.pathname === "/trash" ? (
        <Header />
      ) : null} */}
      {["/home","/archived","/label","/trash"].includes(location.pathname) && <Header />}
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
          <Route path="/label" element={<LabelPage />} />
          <Route path="/archived" element={<Archived />} />
          <Route path="/trash" element={<TrashPage />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      { ["/home","/archived","/label","/trash"].includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
