import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "../data";
import WorkImage from "./WorkImage";
import "./styles/Work.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);
const Work = () => {
  const section = useRef<HTMLDivElement>(null);
  useGSAP(() => {
    const root = section.current;
    const track = root?.querySelector<HTMLElement>(".work-flex");
    if (!root || !track) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1025px)", () => {
      const distance = () => Math.max(0, track.scrollWidth - track.clientWidth);
      gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: {
        trigger: root, start: "top top", end: () => `+=${distance()}`, scrub: true,
        pin: true, invalidateOnRefresh: true,
      }});
    });
    return () => media.revert();
  }, { scope: section });
  return (
    <section className="work-section" id="work" ref={section}>
      <div className="work-container section-container">
        <h2>My <span>Work</span></h2>
        <div className="work-flex">
          {projects.map(project => (
            <article className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title"><h3>{String(project.id).padStart(2,"0")}</h3><div><h4>{project.title}</h4><p>{project.subtitle}</p></div></div>
                <h4>Tools & technologies</h4><p>{project.technologies.join(" · ")}</p>
                <p className="project-description">{project.description}</p>
                <div className="project-links">
                  {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer">Live project ↗</a>}
                  {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer">GitHub ↗</a>}
                </div>
              </div>
              <WorkImage image={project.image} alt={project.title} link={project.liveUrl || project.githubUrl} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Work;
