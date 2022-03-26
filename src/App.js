import "./App.css";
import "./css/main.css";
import { Routes, Route } from "react-router-dom";

import { Landing, SignUp, Login, Home } from "./Pages";
import { Header, Footer, RestrictAuth, RequireAuth, Toast } from "./Components";

function App() {
  return (
    <div className="App">
      {/* {(window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname=== '/') ? null : <Header />}   */}
      <Toast />
        <Routes>
            <Route path="/" element={<Landing />} />

            <Route element={<RestrictAuth/>}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>

            <Route element={<RequireAuth />}>
              <Route path="/home" element={<Home />} />
            </Route>
           
          </Routes>   
      {/* {(window.location.pathname === '/login' || window.location.pathname === '/signup' || window.location.pathname === '/') ? null : <Footer />} */}
    </div>
  );
}

export default App;
