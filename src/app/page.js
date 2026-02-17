"use client"
import Nav from "./components/navbar";
import Foter from "./components/foter";
import Homepage from "./home/home";
export default function Home() {
  return (
    <div className="max-w-5xl mx-auto">
      <Nav />
      <Homepage />
      <Foter />
    </div>
  );
}
