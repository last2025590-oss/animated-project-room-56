import { certificates, resumeUrl } from "../data";
import { originalMedia } from "../media";

export type ScreenSection = "skills" | "experience" | "certificates" | "contact";
export type SectionScreen = { title: string; text?: string; image?: string | undefined; url?: string };
export const screenSectionTitles: Record<ScreenSection, string> = {
  skills: "Skills & services", experience: "Experience", certificates: "Certificates", contact: "Contact",
};
export function getSectionScreens(section: ScreenSection): SectionScreen[] {
  if (section === "skills") return [
    { title: "Full-stack web development", text: "React · Next.js · Node.js · Express · Laravel · PHP · MySQL" },
    { title: "Mobile development", text: "Flutter · Dart · Firebase · REST APIs · State Management" },
    ...["html", "css", "javascript", "typescript", "react", "nextJS", "tailwind", "vitejs", "firebase", "mongoDB", "postgresql", "docker", "git", "figma", "markdown"].map(skill => ({ title: skill, image: originalMedia[`/skills/${skill}.svg`] })),
  ];
  if (section === "experience") return [
    { title: "System Software Developer", text: "INSA · Present\nBuilding mobile and web applications, software development and data protection." },
    { title: "WordPress Developer", text: "Sefastreamline Agency · 2025–now\nLalibela Eco Trekking, Village Speciality Coffee and Care Clinic. Themes, plugins, performance and SEO." },
    { title: "Cybersecurity Summer Camp", text: "INSA · 2025\nData Privacy Compliance Checker using Python, Streamlit and NLP. PII detection, anonymization and compliance." },
    { title: "IT Graduate", text: "Wolkite University · 2025\nInformation Technology graduate. Academic achievements, student representative and Dina Mart final-year project." },
  ];
  if (section === "certificates") return certificates.map(c => ({ title: c.title, image: c.image, url: c.link }));
  return [
    { title: "Email me", text: "ezadinbadru55@gmail.com", url: "mailto:ezadinbadru55@gmail.com" },
    { title: "Call me", text: "+251 940 715 427", url: "tel:+251940715427" },
    { title: "Location", text: "Addis Ababa, Ethiopia" },
    { title: "Resume", text: "Ezadin Badiru · PDF", url: resumeUrl },
    { title: "LinkedIn", text: "Ezadin Badiru", url: "https://www.linkedin.com/in/ezadin-badiru-966643331/" },
  ];
}