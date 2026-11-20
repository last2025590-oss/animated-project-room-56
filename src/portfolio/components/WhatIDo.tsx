import { useEffect } from "react";
import { Code2, Smartphone } from "lucide-react";
import portrait from "@/assets/ezadin-portrait-2.png.asset.json";
import "./styles/WhatIDo.css";

const WhatIDo = () => {
  useEffect(() => {
    const section = document.querySelector(".whatIDO");
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      document.body.classList.toggle("viewing-services", entry?.isIntersecting ?? false);
    }, { threshold: 0 });
    observer.observe(section);
    return () => {
      observer.disconnect();
      document.body.classList.remove("viewing-services");
    };
  }, []);
  return (
    <section className="whatIDO" aria-labelledby="what-heading">
      <div className="what-layout">
        <div className="what-box what-profile">
          <div className="what-heading">
            <span className="what-eyebrow">// Web & mobile development</span>
            <h2 id="what-heading">WHAT <span>I DO</span></h2>
          </div>
          <figure className="what-portrait">
            <img
              src={portrait.url}
              alt="Ezadin Badiru in a white sweater and blue sunglasses, leaning on a railing outdoors"
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
            />
            <figcaption>
              <span>Ezadin Badiru</span>
              <span>Full-stack & mobile developer</span>
            </figcaption>
          </figure>
        </div>
        <div className="what-box what-services">
          <div className="what-box-in">
            <article className="what-content" aria-labelledby="web-heading">
              <div className="what-service-heading">
                <span className="what-number">01 / DEVELOP</span>
                <Code2 aria-hidden="true" size={26} strokeWidth={1.5} />
              </div>
              <div className="what-content-in">
                <h3 id="web-heading">Full-stack web development</h3>
                <p>
                  I build responsive, user-friendly web applications using modern
                  frontend and backend technologies. Passionate about clean code,
                  scalable solutions, and creating seamless digital experiences.
                </p>
                <div className="what-tool-group">
                  <h4>Frontend</h4>
                  <ul className="what-content-flex">
                    {['JavaScript', 'TypeScript', 'React', 'Next.js', 'CSS'].map(skill => <li className="what-tags" key={skill}>{skill}</li>)}
                  </ul>
                </div>
                <div className="what-tool-group">
                  <h4>Backend & data</h4>
                  <ul className="what-content-flex">
                    {['Node.js', 'Express.js', 'Laravel', 'PHP', 'MySQL'].map(skill => <li className="what-tags" key={skill}>{skill}</li>)}
                  </ul>
                </div>
              </div>
            </article>
            <article className="what-content" aria-labelledby="mobile-heading">
              <div className="what-service-heading">
                <span className="what-number">02 / MOBILE</span>
                <Smartphone aria-hidden="true" size={26} strokeWidth={1.5} />
              </div>
              <div className="what-content-in">
                <h3 id="mobile-heading">Cross-platform mobile apps</h3>
                <p>
                  I build cross-platform mobile applications with Flutter and Dart,
                  integrating Firebase authentication, real-time data, and reliable
                  APIs for practical everyday experiences.
                </p>
                <div className="what-tool-group">
                  <h4>Mobile stack</h4>
                  <ul className="what-content-flex">
                    {['Flutter', 'Dart', 'Firebase', 'REST APIs', 'State Management', 'Mobile UI'].map(skill => <li className="what-tags" key={skill}>{skill}</li>)}
                  </ul>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatIDo;
