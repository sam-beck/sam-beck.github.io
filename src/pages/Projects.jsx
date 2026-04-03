const projects = [
  {
    title: "Trading Bot",
    desc: "Python bot using quantitative strategies.",
  },
  {
    title: "FDTD Simulation",
    desc: "Electromagnetic wave simulation in MATLAB.",
  },
];

export default function Projects() {
  return (
    <div className="page">
      <h1>Projects</h1>
      {projects.map((p, i) => (
        <div key={i} className="card">
          <h3>{p.title}</h3>
          <p>{p.desc}</p>
        </div>
      ))}
    </div>
  );
}