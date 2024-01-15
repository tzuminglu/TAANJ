import { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import taanj from "./assets/TAANJ.png";

import Home from "./pages/Home";
import About from "./pages/About";
import Members from "./pages/Members";
import Photos from "./pages/Photos";
import Login from "./pages/Login";
import Admin from "./pages/Admin";

import BackToTopButton from "./components/BackToTopButton";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

import Divider from "@mui/material/Divider";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

import { AuthProvider } from "./contexts/AuthContext";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  width: "589px",
  height: "94px",
  marginTop: "2%",
});

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <div className="App flex flex-col min-h-screen">
        <main className="mt-16">
          <ResponsiveAppBar />
          <Img alt="TAANJ Logo" src={taanj} />
          <Typography
            variant="h6"
            sx={{ textAlign: "center", marginY: "1%", fontFamily: "monospace" }}
          >
            P.O. Box 604, Princeton Junction, NJ 08550
          </Typography>
          <Divider />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/members" element={<Members />} />
            <Route path="/about" element={<About />} />
            <Route path="/photos" element={<Photos />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/admin"
              element={user ? <Admin /> : <Navigate to={"/login"} />}
            />
          </Routes>
        </main>
        <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded mt-20">
          <nav>
            <div className="grid grid-flow-col gap-4">
              <a
                href="https://www.facebook.com/TAANewJersey?fref=nf"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="fill-current"
                >
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
                </svg>
              </a>
            </div>
          </nav>
          <aside>
            <p>
              Copyright © All right reserved by The Taiwanese Association of
              American in New Jersey Chapter
            </p>
          </aside>
        </footer>
        <BackToTopButton />
      </div>
    </AuthProvider>
  );
}

export default App;
