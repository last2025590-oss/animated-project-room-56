const model = { url: "/__l5e/assets-v1/ba0e8275-f022-45b6-9e93-dbaaf5470614/room.glb" };
const titleFont = { url: "/__l5e/assets-v1/ebbd49af-dc09-42c6-b8de-eeb1e523c386/unione.json" };
const subtitleFont = { url: "/__l5e/assets-v1/aaeb07a0-9b0b-4ca1-b2b1-57b3c30bb6bb/helvatica.json" };
const screenVideo = { url: "/__l5e/assets-v1/45870b89-c804-4992-8725-e555f97b5998/arcane.mp4" };
const logo = { url: "/__l5e/assets-v1/009c6851-64ec-462b-8156-f8e69973ace8/logo-e.png" };
const adminAndMobile = { url: "/__l5e/assets-v1/09b720d0-6a4a-4830-8a8e-2e32f3f8619d/adminandmobile.jpg" };
const proshop = { url: "/__l5e/assets-v1/fbe98cf1-c8eb-41be-b1f6-fac53e742d20/proshop.png" };
const myTeachers = { url: "/__l5e/assets-v1/c198eef3-01fc-4013-aa39-ed6180918370/project-myteachers.webp" };
const wholesale = { url: "/__l5e/assets-v1/2fe29cdf-c687-416e-ab4c-adbb60a8e723/project-wholesale.jpg" };
const chatApp = { url: "/__l5e/assets-v1/061a8a18-2aef-47ea-963c-36389ef7f39a/chatApp.jpg" };
const audio = { url: "/__l5e/assets-v1/122d1152-fb7c-49d1-843f-09ec2de88e98/audio.png" };

export const roomAssets = {
  model: model.url,
  titleFont: titleFont.url,
  subtitleFont: subtitleFont.url,
  screenVideo: screenVideo.url,
  logo: logo.url,
};

export type RoomProject = { image: string; url: string; mobileUrl?: string };

export const roomProjects: RoomProject[] = [
  { image: adminAndMobile.url, url: "https://aregenkibet.web.app", mobileUrl: "https://adminpanel-bx43q6fid-ezadin-badrus-projects.vercel.app/" },
  { image: proshop.url, url: "https://github.com/ezadin2/proshop-demo.git" },
  { image: myTeachers.url, url: "https://abuanwar072.github.io/Flutter-Responsive-Admin-Panel-or-Dashboard/" },
  { image: wholesale.url, url: "https://github.com/ezadin2/Flight-Booking-App-Flutter.git" },
  { image: chatApp.url, url: "https://github.com/ezadin2/nextjs-setup" },
  { image: audio.url, url: "https://github.com/ezadin2/Audio-player.git" },
  { image: "/__l5e/assets-v1/6b6d606e-659b-4e27-9d68-e92ec8f6464a/quran.png", url: "https://hasset-delivery-front-end-side.onrender.com/" },
  { image: "/__l5e/assets-v1/b44be9ac-14b9-478a-aea7-2a7796047673/techxpert.png", url: "https://techxpert-rental-market-place.vercel.app/" },
  { image: "/__l5e/assets-v1/b534949d-0dc5-47c1-9202-fe007473db21/my-quran-onrender.png", url: "https://my-quran.onrender.com/" },
  { image: "/__l5e/assets-v1/41f4f321-1ed8-4c0a-a5b9-2cd27dc76aaf/qemer.png", url: "https://qemer-final-project.vercel.app/" },
  { image: "/__l5e/assets-v1/489f69c3-8d3e-4f75-9984-3c5c55806fb2/qemer-fb.png", url: "https://ezadin2.github.io/qemer_tech_project_facebookpage/" },
];

export const ROOM_PAGE_SIZE = 6;
