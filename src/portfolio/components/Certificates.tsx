import { MdArrowOutward } from "react-icons/md";
import { certificates } from "../data";
import "./styles/Certificates.css";

const Certificates = () => {
  return (
    <section className="certificates-section section-container" id="certificates">
      <div className="certificates-heading">
        <h2>
          My <span>Certificates</span>
        </h2>
        <p>Professional certifications and achievements.</p>
      </div>
      <div className="certificates-grid">
        {certificates.map((certificate) => (
          <a
            className="certificate-card"
            href={certificate.link}
            target="_blank"
            rel="noreferrer"
            key={certificate.id}
            data-cursor="disable"
          >
            <div className="certificate-image">
              <img
                src={certificate.image}
                alt={certificate.title}
                loading="lazy"
              />
              <span className="certificate-open" aria-hidden="true">
                <MdArrowOutward />
              </span>
            </div>
            <div className="certificate-caption">
              <span>{String(certificate.id).padStart(2, "0")}</span>
              <h3>{certificate.title}</h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Certificates;
