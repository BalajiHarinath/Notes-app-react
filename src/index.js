import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, ArchiveProvider, NotesProvider } from "./Context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <NotesProvider>
          <ArchiveProvider>
            <App />
          </ArchiveProvider>
        </NotesProvider>
      </AuthProvider> 
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
