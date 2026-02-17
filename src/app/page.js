"use client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "./components/navbar";
import Foter from "./components/foter";
import Loginpage from "./page/login";
import Homepage from "./page/home";
import ProfilePage from "./page/profil";
import Registerpage from "./page/register";
import Blogpage from "./page/blog";
export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/blog" element={<Blogpage />} />
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/dashboard" element={<h1>dashboard</h1>} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Foter />
      </Router>
    </div>
  );
}
