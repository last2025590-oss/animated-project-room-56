
export type Project = {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
};

export const projects: Project[] = [
  {
    id: 1,
    title: "ProShop",
    subtitle: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, cart management, and secure checkout.",
    image: "/__l5e/assets-v1/c692557f-4780-455b-943a-90aac121330a/social.png",
    technologies: ["React.js", "MongoDB", "Node.js", "Express.js", "CSS"],
    githubUrl: "https://github.com/ezadin2/proshop-demo",
  },
  {
    id: 2,
    title: "ሀሴት Delivery",
    subtitle: "Delivery Management Platform",
    description:
      "An Ethiopian delivery platform with customer booking, real-time tracking, admin analytics, and a driver operations interface.",
    image: "/__l5e/assets-v1/6b6d606e-659b-4e27-9d68-e92ec8f6464a/quran.png",
    technologies: ["React.js", "TypeScript", "Node.js", "Tailwind CSS", "Express.js"],
    liveUrl: "https://hasset-delivery-front-end-side.onrender.com/",
    githubUrl: "https://github.com/ezadin2/Hasset_Delivery_Front-End_Side",
  },
  {
    id: 3,
    title: "Dina Mart",
    subtitle: "Complete E-commerce System",
    description:
      "A secure cross-platform shopping experience with verified Firebase authentication, product browsing, cart management, orders, and user accounts.",
    image: "/__l5e/assets-v1/c30b23b7-fa05-4db0-9bc8-5ffa7eebc7da/notes.png",
    technologies: ["Flutter", "Firebase", "Node.js", "MongoDB"],
    liveUrl: "https://adminpanel-bx43q6fid-ezadin-badrus-projects.vercel.app/",
  },
  {
    id: 4,
    title: "Privacy Checker",
    subtitle: "Data Privacy Compliance",
    description:
      "A Streamlit tool built at INSA Summer Camp for PII scanning, anonymization, NLP entity detection, and automated compliance scoring.",
    image: "/__l5e/assets-v1/d027f46a-f9f7-4c73-b5e3-ceb8c5766a2a/trello.png",
    technologies: ["Python", "Streamlit", "NLP", "Pandas"],
    githubUrl: "https://github.com/ezadin2",
  },
  {
    id: 5,
    title: "Audio Application",
    subtitle: "Cross-platform Audio Experience",
    description:
      "An audio-based mobile application showcasing sound features, modern UI, and responsive state management.",
    image: "/__l5e/assets-v1/463f0d89-5871-49bd-9ee7-91cc99eb2a65/portfolio.png",
    technologies: ["Flutter", "Firebase", "Dart", "State Management"],
    githubUrl: "https://github.com/ezadin2/Audio-player",
  },
  {
    id: 6,
    title: "Chat Application",
    subtitle: "Real-time Messaging",
    description:
      "A real-time chat application with a modern interface, user messaging, and a responsive design.",
    image: "/__l5e/assets-v1/e9352b1b-4df4-41d5-ab65-ce967f2c0fc0/chatApp.png",
    technologies: ["Next.js", "Node.js", "Socket.io", "Tailwind CSS"],
    liveUrl: "https://nextjs-setup-gilt.vercel.app/",
    githubUrl: "https://github.com/ezadin2/nextjs-setup",
  },
  {
    id: 7,
    title: "FaydaRent",
    subtitle: "Rental Marketplace",
    description:
      "A trust-first rental marketplace for Ethiopia where people find homes, vehicles and equipment from verified owners, with search by neighborhood, category and price.",
    image: "/__l5e/assets-v1/b44be9ac-14b9-478a-aea7-2a7796047673/techxpert.png",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "https://techxpert-rental-market-place.vercel.app/",
  },
  {
    id: 8,
    title: "Al-Qur'an Al-Kareem",
    subtitle: "Quran Reading App",
    description:
      "A Quran study companion with all 114 surahs, translations, recitations, azkar and duas, prayer times, a Ramadan tracker, hadith and bookmarks.",
    image: "/__l5e/assets-v1/b534949d-0dc5-47c1-9202-fe007473db21/my-quran-onrender.png",
    technologies: ["React.js", "Tailwind CSS", "REST API"],
    liveUrl: "https://my-quran.onrender.com/",
  },
  {
    id: 9,
    title: "QemerTech",
    subtitle: "Tech Education Platform",
    description:
      "An online learning platform offering industry-ready courses in web development, AI and mobile, with course listings, instructors and student sign-up.",
    image: "/__l5e/assets-v1/41f4f321-1ed8-4c0a-a5b9-2cd27dc76aaf/qemer.png",
    technologies: ["React.js", "Tailwind CSS", "Node.js"],
    liveUrl: "https://qemer-final-project.vercel.app/",
  },
  {
    id: 10,
    title: "Socialbook",
    subtitle: "Social Media Page",
    description:
      "A Facebook-style social page with stories, a post feed, events, friends sidebar and chat list.",
    image: "/__l5e/assets-v1/489f69c3-8d3e-4f75-9984-3c5c55806fb2/qemer-fb.png",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveUrl: "https://ezadin2.github.io/qemer_tech_project_facebookpage/",
  },
];

export type Certificate = {
  id: number;
  title: string;
  image: string;
  link: string;
};

export const certificates: Certificate[] = [
  {
    id: 1,
    title: "Certificate of Appreciation",
    image: "/__l5e/assets-v1/a53745e5-7cbd-4536-a4e8-3224cb7edaac/appr2.png",
    link: "/__l5e/assets-v1/a53745e5-7cbd-4536-a4e8-3224cb7edaac/appr2.png",
  },
  {
    id: 2,
    title: "Academic Achievement",
    image: "/__l5e/assets-v1/406e5033-9b73-4567-9e2b-929a857901f0/appre1.png",
    link: "/__l5e/assets-v1/406e5033-9b73-4567-9e2b-929a857901f0/appre1.png",
  },
  {
    id: 3,
    title: "Professional Certificate",
    image: "/__l5e/assets-v1/e82a834b-0f34-4846-aaff-28bc378dc2ea/tempo.png",
    link: "/__l5e/assets-v1/e82a834b-0f34-4846-aaff-28bc378dc2ea/tempo.png",
  },
  {
    id: 4,
    title: "Huawei Certificate",
    image: "/__l5e/assets-v1/2777e8c2-c74d-4935-8c84-935631670547/huawe.png",
    link: "/__l5e/assets-v1/2777e8c2-c74d-4935-8c84-935631670547/huawe.png",
  },
  {
    id: 5,
    title: "Cisco Certificate",
    image: "/__l5e/assets-v1/9c9d800a-df9c-484f-a977-1dcfe7a84bbc/cisco.png",
    link: "/__l5e/assets-v1/9c9d800a-df9c-484f-a977-1dcfe7a84bbc/cisco.png",
  },
  {
    id: 6,
    title: "Development Certificate",
    image: "/__l5e/assets-v1/1848a18d-02d5-4315-96e3-c6b61d3c5106/bago.png",
    link: "/__l5e/assets-v1/1848a18d-02d5-4315-96e3-c6b61d3c5106/bago.png",
  },
  {
    id: 7,
    title: "Technical Certificate",
    image: "/__l5e/assets-v1/01f68590-d13b-4744-9215-702cc56f7618/mosq2.png",
    link: "/__l5e/assets-v1/01f68590-d13b-4744-9215-702cc56f7618/mosq2.png",
  },
  {
    id: 8,
    title: "Oracle Certificate",
    image: "/__l5e/assets-v1/a4cc3f68-4f50-4653-a859-e7883819d424/orac.png",
    link: "/__l5e/assets-v1/a4cc3f68-4f50-4653-a859-e7883819d424/orac.png",
  },
];

export const resumeUrl = "/__l5e/assets-v1/68c7bac3-d0be-4d6e-bc84-2798a925fdea/Ezadin_Badiru_Resume.pdf";
