const contacts = [
    {
        name: "LinkedIn",
        link: "https://www.linkedin.com/in/sam-b-691439233/"
    },
    {
        name: "GitHub",
        link: "https://github.com/sam-beck"
    }
]

export default function Contact() {

    return (
        <div className="page">
            <div className="nav-bar"></div>
            <div className="content-section">
                <h1 className="underline-style">Contact Me.</h1>
                <div className="list-container">
                    {contacts.map((cont) => (
                        <h3 key={`${cont.name}-container`} className="list-item">
                            <a href={cont.link} className="list-item">{cont.name}</a>
                        </h3>
                    ))}
                </div>
            </div>
        </div>
    );
}