export default function App() {
  const projects = [
    {
      title: "Raycasting Engine",
      description:
        "A pseudo-3D raycasting project that simulates depth using column shading and player movement.",
      tech: "JavaScript, p5.js",
    },
    {
      title: "Data Structure Race",
      description:
        "A visual race between BST, ordered linked list, and hash table operations with step counting.",
      tech: "Java, Data Structures",
    },
    {
      title: "Raspberry Pi Thermostat",
      description:
        "A hardware/software project using a Raspberry Pi, temperature sensor, and Python state-machine logic.",
      tech: "Python, Raspberry Pi, MongoDB",
    },
  ];

  return (
    <div style={styles.page}>
      <header style={styles.hero}>
        <p style={styles.kicker}>Alex Hitchens</p>
        <h1 style={styles.title}>Computer Science Portfolio</h1>
        <p style={styles.subtitle}>
          I build software projects that combine problem solving, clean design,
          and hands-on technical implementation.
        </p>

        <div style={styles.buttonRow}>
          <a href="#projects" style={styles.primaryButton}>
            View Projects
          </a>
          <a href="#contact" style={styles.secondaryButton}>
            Contact
          </a>
        </div>
      </header>

      <main style={styles.main}>
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>About Me</h2>
          <p style={styles.text}>
            I’m a computer science student focused on software engineering,
            algorithms, and interactive technical projects. I enjoy building
            things that are both functional and interesting to explore, from
            visual simulations to hardware-integrated applications.
          </p>
        </section>

        <section id="projects" style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects</h2>

          <div style={styles.grid}>
            {projects.map((project) => (
              <div key={project.title} style={styles.card}>
                <h3 style={styles.cardTitle}>{project.title}</h3>
                <p style={styles.cardText}>{project.description}</p>
                <p style={styles.tech}>{project.tech}</p>
                <button style={styles.cardButton}>View Project</button>
              </div>
            ))}
          </div>
        </section>

        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Skills</h2>
          <div style={styles.skillWrap}>
            {[
              "JavaScript",
              "React",
              "Python",
              "Java",
              "MongoDB",
              "HTML/CSS",
              "Data Structures",
              "Raspberry Pi",
            ].map((skill) => (
              <span key={skill} style={styles.skill}>
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section id="contact" style={styles.section}>
          <h2 style={styles.sectionTitle}>Contact</h2>
          <p style={styles.text}>
            Email: your.email@example.com
            <br />
            GitHub: github.com/yourusername
          </p>
        </section>
      </main>
    </div>
  );
}

const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#0f172a",
    color: "#e2e8f0",
    minHeight: "100vh",
    margin: 0,
  },
  hero: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "100px 24px 60px",
  },
  kicker: {
    color: "#38bdf8",
    fontWeight: "bold",
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "12px",
  },
  title: {
    fontSize: "3rem",
    margin: "0 0 16px",
  },
  subtitle: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    maxWidth: "700px",
    color: "#cbd5e1",
  },
  buttonRow: {
    display: "flex",
    gap: "16px",
    marginTop: "28px",
    flexWrap: "wrap",
  },
  primaryButton: {
    textDecoration: "none",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  secondaryButton: {
    textDecoration: "none",
    border: "1px solid #38bdf8",
    color: "#38bdf8",
    padding: "12px 20px",
    borderRadius: "10px",
    fontWeight: "bold",
  },
  main: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "0 24px 80px",
  },
  section: {
    marginTop: "64px",
  },
  sectionTitle: {
    fontSize: "2rem",
    marginBottom: "20px",
  },
  text: {
    color: "#cbd5e1",
    lineHeight: 1.7,
    fontSize: "1rem",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#1e293b",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
  },
  cardTitle: {
    marginTop: 0,
    marginBottom: "12px",
  },
  cardText: {
    color: "#cbd5e1",
    lineHeight: 1.6,
  },
  tech: {
    color: "#38bdf8",
    fontWeight: "bold",
    marginTop: "12px",
  },
  cardButton: {
    marginTop: "16px",
    padding: "10px 14px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },
  skillWrap: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },
  skill: {
    backgroundColor: "#1e293b",
    padding: "10px 14px",
    borderRadius: "999px",
    color: "#cbd5e1",
    border: "1px solid #334155",
  },
};
