"use client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "./components/navbar";
export default function Home() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Home</h1>} />
          <Route path="/login" element={<h1>login</h1>} />
          <Route path="/dashboard" element={<h1>dashboard</h1>} />
        </Routes>
      </Router>
    </>
  );
}
