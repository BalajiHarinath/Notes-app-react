import "./App.css";
import "./css/main.css";
import { Routes, Route, Location, useLocation } from "react-router-dom";

import { Landing, SignUp, Login, Home, Archived } from "./Pages";
import { Header, Footer, RestrictAuth, RequireAuth, Toast, ColorPalette } from "./Components";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      {(location.pathname === '/login' || location.pathname === '/signup' || location.pathname=== '/') ? null : <Header />}  
      <Toast />
        <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/color" element={<ColorPalette />} />

            <Route element={<RestrictAuth/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
              <Route path="/archived" element={<Archived />} />
            </Route>
           
          </Routes>   
      {(location.pathname === '/login' || location.pathname === '/signup' || location.pathname === '/') ? null : <Footer />}
    </div>
  );
}

export default App;
