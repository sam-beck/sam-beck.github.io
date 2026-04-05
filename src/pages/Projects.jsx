const projects = [
  {
    title: "Embedded Trading Bot",
    description: "A microcontroller quantitative trading bot. Includes custom PCB compute modules that communicate via a custom SPI interface.",
  },
  {
    title: "Cycloidal Drive Servo",
    description: "A mechanical and software design for an affordable and precise N20 motor servo including a cycloidal drive gear reducer and magnetometer for absolute positioning control.",
    images:['Cycloid-1-rotated.jpg','Cycloid-2.jpg','Cycloid-3.jpg'],
  },
  {
    title: "OpenGL ES Game Engine",
    description: "A complete GPU 2D and 3D rendering engine written in Java using Android Studio for android devices. Includes the rendering of .obj models, textures, lighting, shadows and camera control.",
    images:['Engine-2.png', 'Engine-3-cropped.png', 'Engine-1.png'],
  },
];

export default function Projects() {
  return (
    <div className="page">
      <div className="nav-bar"></div>
      <div className="content-section">
        <h1 className="underline-style">Things I'm Working On.</h1>
        {projects.map((p) => (
          <div key={`${p.title}-container`} className="sub-container">
            <h2 key={p.title} className="underline-style" style={{ fontWeight: "lighter" }}>{p.title}</h2>
            <div key={`${p.title}-card`} className="card">
              <p>{p.description}</p>
              {p.images ? <div key={`${p.title}-list-container`} className="list-container">
                {p.images.map((src,index) => (
                  <img className="project-image" src={`${p.title}/${src}`} key={`${p.title}-image-${index}`}></img>
                ))}
              </div> : null}
              {p.link ? <a href={p.link}>More Information</a> : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}