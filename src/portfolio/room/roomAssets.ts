const model = { url: "/__l5e/assets-v1/2936ce74-ac2c-44d7-86b1-b34d93ea23a8/room.glb" };
const titleFont = { url: "/__l5e/assets-v1/e98cb99f-a2ff-4cf8-81f5-c565aad158f2/unione.json" };
const subtitleFont = { url: "/__l5e/assets-v1/b0da26dd-479f-4ea4-b179-c23864d2081d/helvatica.json" };
const screenVideo = { url: "/__l5e/assets-v1/f47d87a0-5084-4918-aa40-e7829bc8602a/arcane.mp4" };
const logo = { url: "/__l5e/assets-v1/12684db0-453d-44ad-a25d-d40c19d4edcd/logo-e.png" };
const adminAndMobile = { url: "/__l5e/assets-v1/6cae0513-0562-47a2-8d38-bfea20e4f45b/adminandmobile.jpg" };
const proshop = { url: "/__l5e/assets-v1/c25ad640-fc80-48d9-a75e-d9bc54b8a97a/proshop.png" };
const myTeachers = { url: "/__l5e/assets-v1/073fc8c8-6f38-4466-a28f-3e4ff37b4cb1/project-myteachers.webp" };
const wholesale = { url: "/__l5e/assets-v1/ec13bdce-244c-4218-b0d9-ea17d834bdac/project-wholesale.jpg" };
const chatApp = { url: "/__l5e/assets-v1/e4b49d64-67e7-45a3-9b1e-cfeaf402d38a/chatApp.jpg" };
const audio = { url: "/__l5e/assets-v1/a1305c01-30b5-43da-a78e-9782cad33c1b/audio.png" };

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
  { image: "/__l5e/assets-v1/74baa126-9f69-4474-b301-428f5a5830f2/quran.png", url: "https://hasset-delivery-front-end-side.onrender.com/" },
  { image: "/__l5e/assets-v1/df29c210-7d72-4532-b499-a5a38acc8b83/techxpert.png", url: "https://techxpert-rental-market-place.vercel.app/" },
  { image: "/__l5e/assets-v1/fbe8709b-e1b7-457b-99f5-d4e8c59ef361/my-quran-onrender.png", url: "https://my-quran.onrender.com/" },
  { image: "/__l5e/assets-v1/cb52e160-98ab-46cc-885f-acb0617f569c/qemer.png", url: "https://qemer-final-project.vercel.app/" },
  { image: "/__l5e/assets-v1/0ae98ff5-a93a-4a05-ab14-42b9bdb9ab27/qemer-fb.png", url: "https://ezadin2.github.io/qemer_tech_project_facebookpage/" },
];

export const ROOM_PAGE_SIZE = 6;
