import { useEffect, useState, useRef } from "react";
import { Canvas } from '@react-three/fiber';
import ShaderPlane from '../components/ShaderPlane';

const skills = {
  Languages: [
    "C++",
    "Java",
    "Kotlin",
    "JavaScript",
    "Python",
    "SystemVerilog",
    "MATLAB",
    "GLSL",
    "Data Structures",
  ],

  Libraries: [
    "OpenGL",
    "PyTorch",
    "Flask",
    "React",
    "AngularJS",
  ],

  'Development Domains': [
    "Web Development",
    "Computer Application Development",
    "Mobile Application Development",
    "GPU Rendering",
    "Machine Learning",
    "Embedded Systems",
  ],

  Systems: [
    "PCB Design",
    "3D CAD Design",
    "3D Printing",
  ]
}

export default function Home() {

  const mouse = useRef({ x: 0, y: 0 });

  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    if (window.location.hash == '') setAnimate(true);
  }, []);

  const mouseTrack = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouse.current.x = 2.0 * (e.clientX - rect.left) / rect.width - 1.0;
    mouse.current.y = 1.0 - (e.clientY - rect.top) / rect.height;
  };

  return (
    <div onMouseMove={mouseTrack} className="page">
      <Canvas className={`${animate ? "animate-canvas" : "animate-canvas-fast"}`} style={{ position: 'relative', top: 0, left: 0, zIndex: 0 }}>
        <ShaderPlane mousePosition={mouse} />
      </Canvas>
      <div className="title-panel">
        <h1 className={`underline-style ${animate ? "animate-title" : ""}`}>Sam Beck</h1>
        <p className={`${animate ? "animate-subtitle" : ""}`}>Technical Portfolio</p>
      </div>
      <div className="spacer"></div>
      <div className="content-section">

        <h1 className="underline-style">Hi, I'm Sam.</h1>
        <p>
          I'm currently studying a
          <b className="highlight-style"> Bachelor of Electrical and Electronic Engineering (Honours) </b>
          with a<b className="highlight-style"> Bachelor of Mathematical and Computer Science </b>
          at the<b className="highlight-style"> University of Adelaide</b>.
        </p>
        <p>
          I have a passion for problem solving and its applications within system <b>design and implementation</b>.
          I've gained experience in creating <b>projects</b> including concepts such as:
        </p>
        <ul style={{ listStyleType: "square" }}>
          <li>Embedded system design</li>
          <li>Low-level graphics programming</li>
          <li>Artificial intelligence</li>
          <li>Electrical circuit design</li>
          <li>3D printing</li>
        </ul>
        <p>
          For various electrical and mechanical applications.
        </p>
        <p>
          I'm currently open to <b>internship and entry-level roles</b> as well as <b>research opportunities</b>.
        </p>

        <h1 className="underline-style">My Skills</h1>

        {
          Object.entries(skills).map(([category, skillArray]) => (
            <div key={`${category}-container`} className="sub-container">
              <h2 key={category} className="underline-style" style={{ fontWeight: "lighter" }}>{category}</h2>
              <div key={`${category}-list-container`} className="list-container">
                {skillArray.map((skill) => (
                  <div key={skill} className="list-item">
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))
        }

      </div>
    </div >
  );
}