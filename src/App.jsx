import React, { useEffect, useState } from "react";
// import "./styles/style.css";

// ---- ROUTER ---------------------------------------------------
const useHashRoute = () => {
  const [route, setRoute] = useState(
    () => window.location.hash.replace("#", "") || "/"
  );

  useEffect(() => {
    const onHash = () => setRoute(window.location.hash.replace("#", "") || "/");
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (to) => (window.location.hash = to);

  return { route, navigate };
};

// ---- NAVIGATION ------------------------------------------------
function Nav({ current }) {
  const links = [
    { to: "/", label: "Accueil" },
    { to: "/projects", label: "Projets" },
    { to: "/about", label: "À propos" },
  ];

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-warning shadow-sm">
      <div className="container bg-info-subtle rounded-3">
        <a className="navbar-brand" href="#/">
          Vibes Station
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            {links.map((l) => (
              <li key={l.to} className="nav-item">
                <a
                  href={`#${l.to}`}
                  className={`nav-link ${current === l.to ? "active" : ""}`}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

// ---- FEATURED PROJECT COMPONENT --------------------------------
function FeaturedProject({ projects, navigate }) {
  if (!projects.length) return null;

  const latestProject = projects[projects.length - 1];

  return (
    <div className="card border-primary p-3 mb-3">
      <h3 className="mb-3">🎵 À la une : {latestProject.title}</h3>
      <p>{latestProject.desc}</p>

      <img
        src={latestProject.thumbnail}
        alt={latestProject.title}
        className="img-fluid rounded mb-3 card"
      />

      <h5>Bonne écoute</h5>
      <iframe
        src={latestProject.music.spotify}
        width="100%"
        height="152"
        style={{ borderRadius: 12 }}
        allow="autoplay; encrypted-media"
      />
      <div className="ratio ratio-16x9 mt-3 card">
        <iframe
          src={latestProject.music.youtube.replace("watch?v=", "embed/")}
          title={latestProject.title}
          allowFullScreen
        />
      </div>

      <button
        className="btn btn-outline-primary mt-3 skr"
        onClick={() => navigate(`/project/${latestProject.id}`)}
      >
        Découvrir le projet
      </button>
    </div>
  );
}

// ---- HOME ------------------------------------------------------
function Home({ navigate, projects }) {
  return (
    <header className=" text-white py-1">
      <div className="container text-center card animate-fade-up">
        <h1 className="display-5 my-3 text-warning">Vibes Station Project</h1>
        <p className="lead mb-4">
          Tu veux que tes oeuvres musicales atteignent de nouveaux sommets?
          Rejoins Vibes Station Project, la plateforme ultime pour les
          beatmakers et producteurs passionnés comme toi. Découvre des beats
          exclusifs, partage tes créations, et connecte-toi avec une communauté
          vibrante qui partage ta passion pour la musique. Que tu sois un
          artiste en herbe ou un producteur chevronné, Vibes Station Project est
          l'endroit idéal pour faire évoluer ton art et laisser ta marque dans
          l'industrie musicale. Rejoins nous dès aujourd'hui sur instagram et
          fais vibrer le monde avec tes sons uniques!
        </p>
        <button
          className="btn btn-primary btn-lg mb-2 skr"
          onClick={() => navigate("/projects")}
        >
          Entres dans la station
        </button>

        {/* ----- Spotify Playlist ----- */}
        <div className="d-flex justify-content-center my-4 card animate-fade-up">
          <iframe
            className="my-5"
            style={{ borderRadius: "12px", width: "100%", height: "152px" }}
            src="https://open.spotify.com/embed/playlist/4afpjnbHykZO6OZWBcnZlI?utm_source=generator"
            width="80%"
            height="352"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          ></iframe>
        </div>

        {/* Nouvelle découverte */}
        <FeaturedProject projects={projects} navigate={navigate} />
        {/* VIDEO YOUTUBE EN BAS DE PAGE */}
        <div className="card border-primary p-3 mb-3 card animate-fade-up">
          <h3 className="m-3">🎬 Nouvelle découverte</h3>
          <div className="ratio ratio-16x9 card animate-fade-up">
            <iframe
              src="https://www.youtube.com/embed/Bc84Z8Wzkho?si=wQJLe2Qt0wUvYNt4"
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </header>
  );
}

// ---- PROJECTS LIST --------------------------------------------
function Projects({ projects, navigate }) {
  return (
    <section className="container mt-5 border border-info border-3 rounded-3 p-4 shadow-sm">
      <div className="row g-3">
        <div className="col-12 mb-3 d-flex justify-content-between align-items-center">
          <h2>Projets</h2>
          <small className="text-muted">{projects.length} résultats</small>
        </div>

        {projects.map((p) => (
          <div key={p.id} className="col-12 col-md-6 col-lg-6">
            <article className="card h-100 border border-warning">
              <img
                src={p.thumbnail}
                alt={p.title}
                className="card-img-top m-auto"
              />
              <div className="card-body d-flex flex-column text-center">
                <h5 className="card-title">{p.title}</h5>
                <p className="card-text flex-grow-1">{p.desc}</p>
                <button
                  className="btn btn-outline-primary mt-2 border border-warning skr"
                  onClick={() => navigate(`/project/${p.id}`)}
                >
                  Détails
                </button>
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
}

// ---- PROJECT DETAILS ------------------------------------------
function ProjectDetails({ project, navigate }) {
  if (!project) return null;

  return (
    <section className="container py-5 text-center border border-success border-3 rounded-3 p-4 shadow-sm">
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate("/projects")}
      >
        ← Retour
      </button>

      <h2>{project.title}</h2>
      <p>{project.desc}</p>

      {/* Zone de partage */}
<div className="mt-4">
  <h5>Partager ce projet</h5>

  {/* Construction dynamique de l’URL absolue GitHub Pages */}
  {(() => {
    const url = `https://skred-akm.github.io/Vibes-Station-Concept/projects/${project.id}`;
    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(project.title);

    const share = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`,
      telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    };

    return (
      <div className="d-flex justify-content-center gap-4 mt-3 fs-4">
        <a href={share.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
        <a href={share.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
        <a href={share.whatsapp} target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
        <a href={share.telegram} target="_blank" rel="noopener noreferrer"><i className="fab fa-telegram"></i></a>
        <a href={share.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
      </div>
    );
  })()}

  {/* Bouton copier lien */}
  <button
    className="btn btn-outline-primary btn-sm mt-3"
    onClick={() => {
      const copyUrl = `https://skred-akm.github.io/Vibes-Station-Concept/projects/${project.id}`;
      navigator.clipboard.writeText(copyUrl);
      alert("Lien copié !");
    }}
  >
    Copier le lien
  </button>
</div>

<h5 className="mt-5">Vibes Station Concept</h5>

      
      <iframe
        src={project.music.spotify}
        width="100%"
        height="152"
        style={{ borderRadius: 12 }}
        allow="autoplay; encrypted-media"
      />
      <div className="ratio ratio-16x9 mt-3 card">
        <iframe
          src={project.music.youtube.replace("watch?v=", "embed/")}
          title={project.title}
          allowFullScreen
        />
      </div>
      <img
        src={project.thumbnail}
        alt={project.title}
        className="img-fluid rounded my-5 card"
      />
    </section>
  );
}

// ---- ABOUT -----------------------------------------------------
function About() {
  return (
    <section className="container card m-auto mt-5 text-center border border-danger border-3 rounded-3 p-4 ">
      <h2 className="text-warning">À propos</h2>
      <p>Retrouves-moi sur mes différents réseaux pour partager la passion.</p>

      <div className="row mt-4">
        <div className="col-md-6 mb-3">
          <div className="card p-3 ">
            <h5>Discussion</h5>
            <p>
              Tu souhaites discuter musique et vibes, ou rajouter tes oeuvres à
              une de mes playlist ? Rejoins-moi sur Instagram !
            </p>
            <a href="#" className="btn btn-primary skr">
              Instagram
            </a>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card p-3 ">
            <h5>Vibes</h5>
            <p>
              Abonne-toi pour soutenir les sorties ! Ca fait toujours plaisir.
              Grandissons ensemble. L'aventure ne fait que commencer !
            </p>
            <a
              href="https://www.youtube.com/channel/UCLa4Ej-SdzrSM3ux0ONHzPg?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-warning skr text-danger-emphasis"
            >
              S’abonner à la chaîne YouTube
            </a>
          </div>
        </div>

        <div className="col-md-6 mb-3">
          <div className="card p-3 ">
            <h5>Vibes</h5>
            <p>Beats gratuits et payants disponibles par ici !</p>
            <a
              href="https://www.youtube.com/channel/UCLa4Ej-SdzrSM3ux0ONHzPg?sub_confirmation=1"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-info skr"
            >
              BeatStars
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ---- FOOTER ----------------------------------------------------
function Footer() {
  return (
    <footer className="bg-li< py-4 mt-auto text-center">
      <small>© {new Date().getFullYear()} Vibes Station</small>
    </footer>
  );
}

// ---- APP ROOT --------------------------------------------------
export default function App() {
  const { route, navigate } = useHashRoute();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}projects.json`)
      .then((res) => res.json())
      .then((data) => setProjects(data.projects))
      .catch((err) => console.error("Erreur chargement projets :", err));
  }, []);

  const match = route.match(/^\/project\/(\d+)/);
  const projectId = match ? Number(match[1]) : null;
  const project = projectId && projects.find((p) => p.id === projectId);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Nav current={route} />
      <main className="flex-grow-1">
        {route === "/" && <Home navigate={navigate} projects={projects} />}
        {route === "/projects" && (
          <Projects projects={projects} navigate={navigate} />
        )}
        {project && <ProjectDetails project={project} navigate={navigate} />}
        {route === "/about" && <About />}
      </main>
      <Footer />
    </div>
  );
}
