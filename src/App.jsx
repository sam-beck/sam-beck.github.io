import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Projects from "./pages/Projects";

export default function App() {
  return (
    <div className="app">
      <nav className="nav">
        <h2>Sam Beck</h2>
        <div>
          <Link to="/">Home</Link>
          <Link to="/projects">Projects</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </div>
  );
}