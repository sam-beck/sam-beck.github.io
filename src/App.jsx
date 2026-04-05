import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Scroll from "./Scroll";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";

export default function App() {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if(window.location.hash == '')setAnimate(true);
  }, []);

  return (
    <div className="app">
      <nav className={`nav nav-bar ${animate ? "animate-dash" : ""}`}>
        <div style={{display:"flex", justifyContent:"center", margin:0}}>
          <h3 className="highlight-style">Sam Beck</h3>
          <a style={{color:"var(--text-color)"}}>|</a>
          <h3>Technical Portfolio</h3>
        </div>
        <p>
          <a href="/#/">Home</a>
          <a style={{color:"var(--text-color)"}}>|</a>
          <a href="/#/projects">Projects</a>
          <a style={{color:"var(--text-color)"}}>|</a>
          <a href="/#/contact">Contact</a>
        </p>
      </nav>
      <Scroll />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}