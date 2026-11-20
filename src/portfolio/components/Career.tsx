import "./styles/Career.css";
export const experience = [
  { role: "System Software Developer", organization: "INSA", period: "Present", description: "Building robust mobile and web applications, with practical experience in software development and data protection." },
  { role: "WordPress Developer", organization: "Sefastreamline Agency", period: "2025–now", description: "Built Lalibela Eco Trekking, Village Speciality Coffee, and Care Clinic websites. Customized themes and plugins, improved performance, and optimized sites for search engines." },
  { role: "Cybersecurity Summer Camp", organization: "INSA", period: "2025", description: "Developed a Data Privacy Compliance Checker using Python, Streamlit, and NLP to detect personally identifiable information, anonymize datasets, and assess compliance." },
  { role: "IT Graduate", organization: "Wolkite University", period: "2025", description: "Graduated in Information Technology, recognized for outstanding academic achievements. Served as a student representative and built Dina Mart as a final-year project." },
];
const Career = () => <section className="career-section section-container" id="career"><div className="career-container"><h2>My career <span>&</span><br />experience</h2><div className="career-info"><div className="career-timeline"><div className="career-dot" /></div>{experience.map(item => <div className="career-info-box" key={item.role}><div className="career-info-in"><div className="career-role"><h4>{item.role}</h4><h5>{item.organization}</h5></div><h3>{item.period}</h3></div><p>{item.description}</p></div>)}</div></div></section>;
export default Career;
