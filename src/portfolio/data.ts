
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
    image: "/__l5e/assets-v1/478e0825-1d3c-4843-b779-dd797fd6e599/social.png",
    technologies: ["React.js", "MongoDB", "Node.js", "Express.js", "CSS"],
    githubUrl: "https://github.com/ezadin2/proshop-demo",
  },
  {
    id: 2,
    title: "ሀሴት Delivery",
    subtitle: "Delivery Management Platform",
    description:
      "An Ethiopian delivery platform with customer booking, real-time tracking, admin analytics, and a driver operations interface.",
    image: "/__l5e/assets-v1/74baa126-9f69-4474-b301-428f5a5830f2/quran.png",
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
    image: "/__l5e/assets-v1/5e1253c8-cbf7-4561-b672-51bfc8e57241/notes.png",
    technologies: ["Flutter", "Firebase", "Node.js", "MongoDB"],
    liveUrl: "https://adminpanel-bx43q6fid-ezadin-badrus-projects.vercel.app/",
  },
  {
    id: 4,
    title: "Privacy Checker",
    subtitle: "Data Privacy Compliance",
    description:
      "A Streamlit tool built at INSA Summer Camp for PII scanning, anonymization, NLP entity detection, and automated compliance scoring.",
    image: "/__l5e/assets-v1/246f9fca-0ea5-4df7-be4c-38ab2ade769f/trello.png",
    technologies: ["Python", "Streamlit", "NLP", "Pandas"],
    githubUrl: "https://github.com/ezadin2",
  },
  {
    id: 5,
    title: "Audio Application",
    subtitle: "Cross-platform Audio Experience",
    description:
      "An audio-based mobile application showcasing sound features, modern UI, and responsive state management.",
    image: "/__l5e/assets-v1/ab978cef-13f2-48f2-8140-c10020b127c3/portfolio.png",
    technologies: ["Flutter", "Firebase", "Dart", "State Management"],
    githubUrl: "https://github.com/ezadin2/Audio-player",
  },
  {
    id: 6,
    title: "Chat Application",
    subtitle: "Real-time Messaging",
    description:
      "A real-time chat application with a modern interface, user messaging, and a responsive design.",
    image: "/__l5e/assets-v1/8e2ba7f2-1f42-4c82-ad79-29c4b3396db7/chatApp.png",
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
    image: "/__l5e/assets-v1/df29c210-7d72-4532-b499-a5a38acc8b83/techxpert.png",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "Node.js"],
    liveUrl: "https://techxpert-rental-market-place.vercel.app/",
  },
  {
    id: 8,
    title: "Al-Qur'an Al-Kareem",
    subtitle: "Quran Reading App",
    description:
      "A Quran study companion with all 114 surahs, translations, recitations, azkar and duas, prayer times, a Ramadan tracker, hadith and bookmarks.",
    image: "/__l5e/assets-v1/fbe8709b-e1b7-457b-99f5-d4e8c59ef361/my-quran-onrender.png",
    technologies: ["React.js", "Tailwind CSS", "REST API"],
    liveUrl: "https://my-quran.onrender.com/",
  },
  {
    id: 9,
    title: "QemerTech",
    subtitle: "Tech Education Platform",
    description:
      "An online learning platform offering industry-ready courses in web development, AI and mobile, with course listings, instructors and student sign-up.",
    image: "/__l5e/assets-v1/cb52e160-98ab-46cc-885f-acb0617f569c/qemer.png",
    technologies: ["React.js", "Tailwind CSS", "Node.js"],
    liveUrl: "https://qemer-final-project.vercel.app/",
  },
  {
    id: 10,
    title: "Socialbook",
    subtitle: "Social Media Page",
    description:
      "A Facebook-style social page with stories, a post feed, events, friends sidebar and chat list.",
    image: "/__l5e/assets-v1/0ae98ff5-a93a-4a05-ab14-42b9bdb9ab27/qemer-fb.png",
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
    image: "/__l5e/assets-v1/61798b11-a925-42a4-b236-988790c7b5f7/appr2.png",
    link: "/__l5e/assets-v1/61798b11-a925-42a4-b236-988790c7b5f7/appr2.png",
  },
  {
    id: 2,
    title: "Academic Achievement",
    image: "/__l5e/assets-v1/9fc8ddbb-e63a-4a27-9590-f7715f68c31a/appre1.png",
    link: "/__l5e/assets-v1/9fc8ddbb-e63a-4a27-9590-f7715f68c31a/appre1.png",
  },
  {
    id: 3,
    title: "Professional Certificate",
    image: "/__l5e/assets-v1/7f5a34d6-6829-414f-9f36-461b111537f2/tempo.png",
    link: "/__l5e/assets-v1/7f5a34d6-6829-414f-9f36-461b111537f2/tempo.png",
  },
  {
    id: 4,
    title: "Huawei Certificate",
    image: "/__l5e/assets-v1/a6c3b6a9-812d-42c9-bf8e-20cd84c850e6/huawe.png",
    link: "/__l5e/assets-v1/a6c3b6a9-812d-42c9-bf8e-20cd84c850e6/huawe.png",
  },
  {
    id: 5,
    title: "Cisco Certificate",
    image: "/__l5e/assets-v1/1ae6c8bc-961b-4505-8758-6052e5aaea69/cisco.png",
    link: "/__l5e/assets-v1/1ae6c8bc-961b-4505-8758-6052e5aaea69/cisco.png",
  },
  {
    id: 6,
    title: "Development Certificate",
    image: "/__l5e/assets-v1/42c52858-b8a9-46d0-b027-b0b5b8e7f687/bago.png",
    link: "/__l5e/assets-v1/42c52858-b8a9-46d0-b027-b0b5b8e7f687/bago.png",
  },
  {
    id: 7,
    title: "Technical Certificate",
    image: "/__l5e/assets-v1/33b70415-1e6c-4554-96ea-1b25a19eff36/mosq2.png",
    link: "/__l5e/assets-v1/33b70415-1e6c-4554-96ea-1b25a19eff36/mosq2.png",
  },
  {
    id: 8,
    title: "Oracle Certificate",
    image: "/__l5e/assets-v1/b41a4d58-f86a-4109-8039-d8ce48a0a96c/orac.png",
    link: "/__l5e/assets-v1/b41a4d58-f86a-4109-8039-d8ce48a0a96c/orac.png",
  },
];

export const resumeUrl = "/__l5e/assets-v1/aa0f6e14-71d6-4885-808c-322ba52607db/Ezadin_Badiru_Resume.pdf";
