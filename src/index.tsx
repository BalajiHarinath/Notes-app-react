import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { makeServer } from "./server";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider, ArchiveProvider, NotesProvider, TrashProvider } from "./Context";

// Call make Server
makeServer();

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <AuthProvider>
          <TrashProvider>
            <NotesProvider>
              <ArchiveProvider>             
                  <App />                
              </ArchiveProvider>
            </NotesProvider>
          </TrashProvider> 
        </AuthProvider> 
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
