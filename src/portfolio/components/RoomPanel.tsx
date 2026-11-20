// @ts-nocheck -- in-room panels so visitors never leave the Room
import { originalMedia } from "../media";
import { useState } from "react";
import { projects, certificates, resumeUrl } from "../data";
import { experience } from "./Career";

const skills = ["html","css","javascript","typescript","react","nextJS","tailwind","vitejs","firebase","mongoDB","postgresql","docker","git","figma","markdown"];

export type PanelKey = "about" | "skills" | "experience" | "work" | "certificates" | "contact";

export const panelTitles: Record<string, string> = {
  skills: "Skills & services", experience: "Experience",
  certificates: "Certificates", contact: "Contact",
};

const RoomPanel = ({ panel, onClose }: { panel: PanelKey; onClose: () => void }) => {
  const [project, setProject] = useState(null);
  const [cert, setCert] = useState(null);
  return (
    <div className="room-panel" role="dialog" aria-label={panelTitles[panel]}>
      <div className="room-panel-head">
        <h2>{project ? project.title : panelTitles[panel]}</h2>
        <button onClick={() => (project ? setProject(null) : onClose())}>{project ? "← Projects" : "Close ✕"}</button>
      </div>
      <div className="room-panel-body">
        {panel === "about" && (
          <p>I'm Ezadin Badiru, an IT graduate from Wolkite University and a full-stack developer based in Addis Ababa, Ethiopia. I build robust mobile and web applications with Flutter, the MERN stack, and Laravel. From e-commerce and delivery platforms to data privacy tools, I turn practical ideas into reliable software. I work as a System Software Developer at INSA and am open to remote opportunities.</p>
        )}
        {panel === "skills" && (
          <div className="room-skills">{skills.map((s) => <div key={s}><img src={originalMedia[`/skills/${s}.svg`]} alt="" /><span>{s}</span></div>)}</div>
        )}
        {panel === "experience" && experience.map((e) => (
          <div className="room-item" key={e.role}><h4>{e.role} <small>· {e.organization} · {e.period}</small></h4><p>{e.description}</p></div>
        ))}
        {panel === "work" && !project && (
          <div className="room-grid">{projects.map((p) => (
            <button className="room-card" key={p.id} onClick={() => setProject(p)}>
              <img src={p.image} alt={p.title} /><h4>{p.title}</h4><p>{p.subtitle}</p>
            </button>
          ))}</div>
        )}
        {panel === "work" && project && <ProjectView project={project} />}
        {panel === "certificates" && (
          cert ? <div className="room-cert"><img src={cert.image} alt={cert.title} /><button onClick={() => setCert(null)}>← All certificates</button></div> :
          <div className="room-grid">{certificates.map((c) => (
            <button className="room-card" key={c.id} onClick={() => setCert(c)}><img src={c.image} alt={c.title} /><h4>{c.title}</h4></button>
          ))}</div>
        )}
        {panel === "contact" && (
          <div className="room-item">
            <p>Email: <a href="mailto:ezadinbadru55@gmail.com">ezadinbadru55@gmail.com</a></p>
            <p>Phone: <a href="tel:+251940715427">+251 940 715 427</a></p>
            <p>Location: Addis Ababa, Ethiopia</p>
            <p><a href={resumeUrl} target="_blank" rel="noreferrer">Resume (PDF)</a></p>
          </div>
        )}
      </div>
    </div>
  );
};

export const ProjectView = ({ project }) => (
  <div className="room-project">
    <p className="room-tech">{project.technologies?.join(" · ")}</p>
    <p>{project.description}</p>
    {project.liveUrl ? (
      <iframe src={project.liveUrl} title={project.title} loading="lazy" />
    ) : (
      <img src={project.image} alt={project.title} />
    )}
  </div>
);

export default RoomPanel;
