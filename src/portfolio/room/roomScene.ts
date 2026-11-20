// @ts-nocheck -- ported from Ezadin's original vanilla Three.js room portfolio
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { roomAssets, roomProjects, ROOM_PAGE_SIZE } from "./roomAssets";
import { getSectionScreens, type ScreenSection } from "./sectionScreens";
import { wallLayout } from "./wallLayout";
import { drawScreen, screenImages } from "./screenArtwork";

export type RoomTheme = "light" | "dark";
export type RoomCallbacks = {
  onLoaded: () => void;
  onProgress?: (percent: number) => void;
  onError?: () => void;
  onFocusChange: (focused: boolean) => void;
  onThemeChange: (theme: RoomTheme) => void;
  onChooseProject: (urls: { url: string; mobileUrl: string }) => void;
};
export type RoomApi = {
  showAbout: () => void;
  showProjects: (page?: number) => void;
  showSection: (section: ScreenSection, page?: number) => void;
  projectPages: number;
  reset: () => void;
  dispose: () => void;
};

export function createRoom(container: HTMLElement, canvas: HTMLCanvasElement, cb: RoomCallbacks): RoomApi {
  let theme: RoomTheme = "light";
  let bookCover = null, lightSwitch = null, titleText = null, subtitleText = null, mixer = null;
  let disposed = false;
  const isMobile = window.matchMedia("(max-width: 992px)").matches;
  const clipNames = ["fan_rotation", "fan_rotation.001", "fan_rotation.002", "fan_rotation.003", "fan_rotation.004"];
  const projects = roomProjects.map((p) => ({ ...p }));
  let sectionMeshes: THREE.Mesh[] = [];
  const clearSection = () => {
    sectionMeshes.forEach(mesh => { scene.remove(mesh); mesh.geometry.dispose(); mesh.material.map?.dispose(); mesh.material.dispose(); });
    sectionMeshes = [];
  };

  let aboutCameraPos = { x: 0.12, y: 0.2, z: 0.55 };
  let aboutCameraRot = { x: -1.54, y: 0.13, z: 1.41 };
  let projectsCameraPos = { x: 1.1, y: 0.8, z: 0.35 };
  let projectsCameraRot = { x: 0, y: 0, z: 0 };
  const defaultCameraPos = { x: 1.009028643133046, y: 0.5463638814987481, z: 0.4983449671971262 };
  const defaultCamerRot = { x: -0.8313297556598935, y: 0.9383399492446749, z: 0.7240714481613063 };

  const size = () => ({ w: container.clientWidth || window.innerWidth, h: container.clientHeight || window.innerHeight });
  const scene = new THREE.Scene();
  const { w, h } = size();
  const camera = new THREE.PerspectiveCamera(75, w / h, 0.01, 1000);
  camera.position.set(defaultCameraPos.x, defaultCameraPos.y, defaultCameraPos.z);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setSize(w, h, false);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false;
  controls.enableZoom = false; // keep the mouse wheel for scrolling the page
  controls.minDistance = 0.9;
  controls.maxDistance = 1.6;
  controls.minAzimuthAngle = 0.2;
  controls.maxAzimuthAngle = Math.PI * 0.78;
  controls.minPolarAngle = 0.3;
  controls.maxPolarAngle = Math.PI / 2;
  controls.update();

  // Lights (decay 0 keeps the look of the original legacy lighting)
  const point = (color, intensity, distance) => { const l = new THREE.PointLight(color, intensity, distance, 0); scene.add(l); return l; };
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6 * Math.PI);
  scene.add(ambientLight);
  const roomLight = point(0xffffff, 2.5, 10);
  roomLight.position.set(0.3, 2, 0.5);
  roomLight.castShadow = true;
  roomLight.shadow.radius = 5;
  roomLight.shadow.mapSize.set(2048, 2048);
  roomLight.shadow.camera.far = 2.5;
  roomLight.shadow.bias = -0.002;
  const fanLight1 = point(0xff0000, 30, 0.2); fanLight1.position.set(0, 0.29, -0.29);
  const fanLight2 = point(0x00ff00, 30, 0.12); fanLight2.position.set(-0.15, 0.29, -0.29);
  const fanLight3 = point(0x00ff00, 30, 0.2); fanLight3.position.set(0.21, 0.29, -0.29);
  const fanLight4 = point(0x00ff00, 30, 0.2); fanLight4.position.set(0.21, 0.19, -0.29);
  const fanLight5 = point(0x00ff00, 30, 0.05); fanLight5.position.set(0.21, 0.08, -0.29);
  const textLights = [[-0.2, 0.6, 0.24], [-0.2, 0.6, 0.42], [-0.2, 0.6, 0.01], [-0.2, 0.6, -0.14]].map((p) => {
    const l = point(0xff0000, 0, 1.1); l.position.set(p[0], p[1], p[2]); return l;
  });

  const video = document.createElement("video");
  video.src = roomAssets.screenVideo;
  video.muted = true; video.playsInline = true; video.autoplay = true; video.loop = true; video.crossOrigin = "anonymous";

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderConfig({ type: "js" });
  dracoLoader.setDecoderPath("/draco-room/");
  let assetsReady = false, roomRendered = false;
  const manager = new THREE.LoadingManager();
  manager.onLoad = () => { assetsReady = true; };
  manager.onProgress = (_url, loaded, total) => cb.onProgress?.(Math.round(loaded / total * 95));
  manager.onError = () => cb.onError?.();
  const gltfLoader = new GLTFLoader(manager);
  gltfLoader.setDRACOLoader(dracoLoader);
  const textureLoader = new THREE.TextureLoader(manager);
  const imageUrls = [...new Set(["skills", "experience", "certificates", "contact"].flatMap(section => getSectionScreens(section as ScreenSection).map(card => card.image).filter(Boolean)))];
  imageUrls.forEach(url => {
    manager.itemStart(url);
    const image = new Image(); image.crossOrigin = "anonymous";
    image.onload = () => { screenImages.set(url, image); manager.itemEnd(url); };
    image.onerror = () => { manager.itemError(url); manager.itemEnd(url); };
    image.src = url;
  });

  gltfLoader.load(roomAssets.model, (room) => {
    if (disposed) return;
    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.minFilter = THREE.NearestFilter;
    videoTexture.magFilter = THREE.NearestFilter;
    videoTexture.generateMipmaps = false;
    videoTexture.colorSpace = THREE.SRGBColorSpace;

    room.scene.children.forEach((child) => {
      if (child.name !== "Wall") child.castShadow = true;
      child.receiveShadow = true;
      child.children?.forEach((inner) => {
        if (inner.name !== "Book001" && inner.name !== "Switch") inner.castShadow = true;
        inner.receiveShadow = true;
      });
      if (child.name === "Stand") {
        child.children[0].material = new THREE.MeshBasicMaterial({ map: videoTexture });
        video.play().catch(() => {});
      }
      if (child.name === "CPU") {
        [2, 1].forEach((transmission, i) => {
          const m = new THREE.MeshPhysicalMaterial({ roughness: 0, color: 0x999999, ior: 2.333, transmission, opacity: 0.8, depthWrite: false, depthTest: false });
          child.children[i].material = m;
        });
      }
      if (child.name === "Book") {
        bookCover = child.children[0];
        const coverMats = Array.isArray(bookCover.material) ? bookCover.material : [bookCover.material];
        // E logo cover served from public/ so it loads in every environment
        textureLoader.load("/__l5e/assets-v1/b360632e-e373-478d-b72d-bc38d465cb51/book-cover-e.png", (t) => {
          t.flipY = false; t.colorSpace = THREE.SRGBColorSpace;
          coverMats.forEach((m) => { if (m?.map) { m.map = t; m.needsUpdate = true; } });
        });
        const bookCanvas = document.createElement("canvas");
        bookCanvas.width = 2436; bookCanvas.height = 2052;
        const bookTexture = new THREE.CanvasTexture(bookCanvas);
        drawAboutPage(bookCanvas);
        bookTexture.needsUpdate = true;
        bookTexture.flipY = false;
        bookTexture.colorSpace = THREE.SRGBColorSpace;
        bookTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();
        bookTexture.generateMipmaps = true;
        bookTexture.minFilter = THREE.LinearMipmapLinearFilter;
        child.material = new THREE.MeshBasicMaterial({ map: bookTexture });
      }
      if (child.name === "SwitchBoard") lightSwitch = child.children[0];
    });

    scene.add(room.scene);
    mixer = new THREE.AnimationMixer(room.scene);
    clipNames.forEach((name) => {
      const clip = THREE.AnimationClip.findByName(room.animations, name);
      if (clip) mixer.clipAction(clip).play();
    });
    if (isMobile) {
      room.scene.scale.set(0.95, 0.95, 0.95);
      aboutCameraPos = { x: 0.09, y: 0.23, z: 0.51 };
      aboutCameraRot = { x: -1.57, y: 0, z: 1.57 };
      projectsCameraPos = { x: 1.1, y: 0.82, z: 0.5 };
      projectsCameraRot = { x: 0, y: 0, z: 1.55 };
      projects.forEach((p) => (p.mesh.position.z = -1.13));
      controls.maxAzimuthAngle = Math.PI * 0.75;
    }
    loadIntroText();
  }, (xhr) => {
    if (xhr.total) cb.onProgress?.(Math.round((xhr.loaded / xhr.total) * 100));
  }, (err) => { console.error(err); cb.onError?.(); });

  function loadIntroText() {
    const loader = new FontLoader(manager);
    const mats = () => [new THREE.MeshPhongMaterial({ color: 0x171f27, flatShading: true }), new THREE.MeshPhongMaterial({ color: 0xffffff })];
    loader.load(roomAssets.titleFont, (font) => {
      if (disposed) return;
      titleText = new THREE.Mesh(new TextGeometry("Ezadin Badiru", { font, size: 0.08, depth: 0.01 }), mats());
      titleText.rotation.y = Math.PI * 0.5;
      titleText.position.set(-0.27, 0.55, 0.5);
      scene.add(titleText);
    });
    loader.load(roomAssets.subtitleFont, (font) => {
      if (disposed) return;
      subtitleText = new THREE.Mesh(new TextGeometry("Full-Stack & Flutter Developer / UI/UX Designer", { font, size: 0.018, depth: 0.0001 }), mats());
      subtitleText.rotation.y = Math.PI * 0.5;
      subtitleText.position.set(-0.255, 0.5, 0.5);
      scene.add(subtitleText);
    });
  }

  // Project planes on the back wall
  projects.forEach((project, i) => {
    const tex = textureLoader.load(project.image);
    tex.colorSpace = THREE.SRGBColorSpace;
    const plane = new THREE.Mesh(new THREE.PlaneGeometry(0.54, 0.3), new THREE.MeshBasicMaterial({ color: 0xffffff, map: tex, transparent: true, opacity: 0 }));
    plane.name = "project";
    plane.userData = { url: project.url, mobileUrl: project.mobileUrl };
    const y = 1.2 - Math.floor(i / 4) * 0.36;
    plane.position.set(0.2 + (i % 4) * 0.6, y, -1.15);
    plane.scale.set(0, 0, 0);
    project.mesh = plane;
    project.originalY = y;
    scene.add(plane);
  });
  (window as any).__roomDbg = { scene, camera, projects, renderer, controls };

  const setTextColor = (dark) => {
    [titleText, subtitleText].forEach((t) => {
      if (!t) return;
      if (dark) { t.material[0].color.setRGB(8, 8, 8); t.material[1].color.setRGB(5, 5, 5); }
      else { t.material[0].color.setRGB(0.0902, 0.1216, 0.153); t.material[1].color.setRGB(1, 1, 1); }
    });
  };
  function switchTheme(next: RoomTheme) {
    theme = next;
    const dark = next === "dark";
    if (lightSwitch) lightSwitch.rotation.z = dark ? Math.PI / 7 : 0;
    gsap.to(roomLight.color, dark ? { r: 0.2725, g: 0.2314, b: 0.6863 } : { r: 1, g: 1, b: 1 });
    gsap.to(ambientLight.color, dark ? { r: 0.1725, g: 0.2314, b: 0.6863 } : { r: 1, g: 1, b: 1 });
    gsap.to(roomLight, { intensity: dark ? 1.5 : 2.5 });
    gsap.to(ambientLight, { intensity: (dark ? 0.3 : 0.6) * Math.PI });
    gsap.to(fanLight5, { distance: dark ? 0.07 : 0.05 });
    setTextColor(dark);
    textLights.forEach((l) => gsap.to(l, { intensity: dark ? 0.6 : 0 }));
    cb.onThemeChange(next);
  }

  const resetBookCover = () => bookCover && gsap.to(bookCover.rotation, { x: 0, duration: 1.5 });
  function resetProjects() {
    projects.forEach((p) => {
      gsap.to(p.mesh.material, { opacity: 0, duration: 1 });
      gsap.to(p.mesh.position, { y: p.originalY, duration: 1 });
      gsap.to(p.mesh.scale, { x: 0, y: 0, z: 0, duration: 0, delay: 1 });
    });
  }
  function reset() {
    if (titleText) titleText.visible = true;
    if (subtitleText) subtitleText.visible = true;
    activeSection = null;
    clearSection();
    resetBookCover(); resetProjects(); cb.onFocusChange(false);
    gsap.to(camera.position, { ...defaultCameraPos, duration: 1.5 });
    zoomTo(1);
    gsap.to(camera.rotation, { ...defaultCamerRot, duration: 1.5 });
    gsap.delayedCall(1.5, () => (controls.enabled = true));
    if (theme !== "dark") gsap.to(roomLight, { intensity: 2.5, duration: 1.5 });
  }
  function showAbout() {
    if (titleText) titleText.visible = true;
    if (subtitleText) subtitleText.visible = true;
    activeSection = null;
    if (!bookCover) return;
    clearSection();
    controls.enabled = false; resetProjects();
    gsap.to(camera.position, { ...aboutCameraPos, duration: 1.5 });
    gsap.to(camera.rotation, { ...aboutCameraRot, duration: 1.5 });
    zoomTo(1.05);
    gsap.to(bookCover.rotation, { x: Math.PI, duration: 1.5, delay: 1.5 });
    if (theme !== "dark") gsap.to(roomLight, { intensity: 1, duration: 1.5 });
    gsap.delayedCall(1.5, () => cb.onFocusChange(true));
  }
  const zoomTo = (z) => gsap.to(camera, { zoom: z, duration: 1.5, onUpdate: () => camera.updateProjectionMatrix() });
  function showProjects() {
    if (titleText) titleText.visible = true;
    if (subtitleText) subtitleText.visible = true;
    activeSection = null;
    clearSection();
    controls.enabled = false; resetBookCover();
    gsap.to(camera.position, { ...projectsCameraPos, duration: 1.5 });
    gsap.to(camera.rotation, { ...projectsCameraRot, duration: 1.5 });
    zoomTo(1.3);
    gsap.delayedCall(1.5, () => cb.onFocusChange(true));
    projects.forEach((p, i) => {
      const k = i;
      p.mesh.scale.set(1, 1, 1);
      gsap.to(p.mesh.material, { opacity: 1, duration: 1.5, delay: 1.5 + k * 0.1 });
      gsap.to(p.mesh.position, { y: p.originalY, duration: 1, delay: 1.5 + k * 0.1 });
    });
  }

  let activeSection: ScreenSection | null = null, activePage = 0;
  function fitSection() {
    if (!activeSection) return;
    const layout = wallLayout(getSectionScreens(activeSection).length, activePage);
    const center = new THREE.Vector3(-0.245, 0.85 - (layout.rows - 1) * (layout.cardH + layout.gap) / 2, 0.02);
    const menuSpace = window.innerWidth > 768 ? 220 : 32;
    const usableAspect = Math.max(0.25, (container.clientWidth - menuSpace) / container.clientHeight);
    const distance = Math.max(0.42, (layout.width + 0.1) / usableAspect / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))), (layout.rows * (layout.cardH + layout.gap) + 0.25) / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))));
    const shift = window.innerWidth > 768 ? distance * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * camera.aspect * menuSpace / container.clientWidth : 0;
    center.z += shift;
    gsap.killTweensOf(camera.position); gsap.killTweensOf(camera.rotation); gsap.killTweensOf(camera);
    camera.zoom = 1; camera.updateProjectionMatrix();
    gsap.to(camera.position, { x: center.x + distance, y: center.y, z: center.z, duration: 1.2, onUpdate: () => camera.lookAt(center) });
    camera.lookAt(center);
  }
  function showSection(section: ScreenSection, page = 0) {
    if (titleText) titleText.visible = false;
    if (subtitleText) subtitleText.visible = false;
    clearSection(); resetBookCover(); resetProjects(); controls.enabled = false;
    activeSection = section; activePage = page; cb.onFocusChange(true);
    const cards = getSectionScreens(section), layout = wallLayout(cards.length, page);
    cards.slice(layout.start, layout.start + layout.length).forEach((card, i) => {
      const c = document.createElement("canvas"); c.width = 800; c.height = Math.round(800 * layout.cardH / layout.cardW);
      drawScreen(c, card, section, layout.start + i);
      const texture = new THREE.CanvasTexture(c); texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(layout.cardW, layout.cardH), new THREE.MeshBasicMaterial({ map: texture }));
      mesh.name = "section-screen"; mesh.userData = { section, title: card.title, url: card.url };
      mesh.rotation.y = Math.PI / 2;
      const p = layout.positions[i]; mesh.position.set(p.x, p.y, p.z);
      scene.add(mesh); sectionMeshes.push(mesh);
    });
    fitSection();
  }

  // Clicking objects inside the room
  const mouse = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();
  let downAt = null;
  const onDown = (e) => (downAt = { x: e.clientX, y: e.clientY });
  const onClick = (e) => {
    if (downAt && Math.hypot(e.clientX - downAt.x, e.clientY - downAt.y) > 6) return; // was a drag
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hits = raycaster.intersectObjects(scene.children);
    const nextTheme = theme === "light" ? "dark" : "light";
    let themeToggled = false;
    for (const hit of hits) {
      const name = hit.object.name;
      if (name === "section-screen") {
        const url = hit.object.userData.url;
        if (url) window.open(url, "_blank", "noopener,noreferrer");
        return;
      }
      if (name === "project" && hit.object.material.opacity > 0.5) {
        const { url, mobileUrl } = hit.object.userData;
        if (url || mobileUrl) cb.onChooseProject({ url, mobileUrl });
        return;
      }
      if (name === "Book" || name === "Book001") { showAbout(); return; }
      if ((name === "SwitchBoard" || name === "Switch") && !themeToggled) { themeToggled = true; switchTheme(nextTheme); return; }
    }
  };
  // Hover zoom: enlarge the screen under the pointer and lift it off the wall
  let hovered: any = null;
  const HOVER_SCALE = 1.035, HOVER_LIFT = 0.008;
  const unhover = () => {
    if (!hovered) return;
    const h = hovered; hovered = null;
    gsap.to(h.scale, { x: 1, y: 1, z: 1, duration: 0.3 });
    gsap.to(h.position, { ...h.userData.base, duration: 0.3 });
    h.renderOrder = 0; canvas.style.cursor = "";
  };
  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const rect = canvas.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const hit = raycaster.intersectObjects([...sectionMeshes, ...projects.map((p) => p.mesh)])
      .find((h) => h.object.name === "section-screen" || (h.object.name === "project" && h.object.material.opacity > 0.5));
    const obj = hit?.object ?? null;
    if (obj === hovered) return;
    unhover();
    if (!obj) return;
    hovered = obj;
    if (!obj.userData.base) obj.userData.base = { x: obj.position.x, y: obj.position.y, z: obj.position.z };
    const n = new THREE.Vector3(0, 0, 1).applyQuaternion(obj.quaternion).multiplyScalar(HOVER_LIFT);
    const b = obj.userData.base;
    gsap.to(obj.scale, { x: HOVER_SCALE, y: HOVER_SCALE, z: 1, duration: 0.3 });
    gsap.to(obj.position, { x: b.x + n.x, y: b.y + n.y, z: b.z + n.z, duration: 0.3 });
    obj.renderOrder = 10; canvas.style.cursor = "pointer";
  };
  canvas.addEventListener("pointermove", onMove);
  canvas.addEventListener("pointerleave", unhover);
  canvas.addEventListener("pointerdown", onDown);
  canvas.addEventListener("click", onClick);

  const onResize = () => {
    const s = size();
    camera.aspect = s.w / s.h;
    camera.updateProjectionMatrix();
    renderer.setSize(s.w, s.h, false);
    if (activeSection) fitSection();
  };
  const ro = new ResizeObserver(onResize);
  ro.observe(container);

  // Render only while the room is on screen
  let visible = true;
  const io = new IntersectionObserver(([entry]) => (visible = entry?.isIntersecting ?? true));
  io.observe(container);
  const clock = new THREE.Clock();
  renderer.setAnimationLoop(() => {
    const dt = clock.getDelta();
    if (!visible) return;
    mixer?.update(dt);
    renderer.render(scene, camera);
    if (assetsReady && !roomRendered) {
      roomRendered = true;
      canvas.setAttribute("data-room-ready", "true");
      cb.onProgress?.(100); cb.onLoaded();
    }
  });

  return {
    showAbout, showProjects, showSection, reset,
    projectPages: Math.ceil(projects.length / ROOM_PAGE_SIZE),
    dispose() {
      disposed = true;
      clearSection();
      renderer.setAnimationLoop(null);
      ro.disconnect(); io.disconnect();
      canvas.removeEventListener("pointerdown", onDown);
      canvas.removeEventListener("click", onClick); canvas.removeEventListener("pointermove", onMove); canvas.removeEventListener("pointerleave", unhover);
      controls.dispose(); dracoLoader.dispose(); video.pause();
      renderer.dispose();
    },
  };
}

const ABOUT_TEXT = "I'm Ezadin Badiru, an IT graduate from Wolkite University and a full-stack developer based in Addis Ababa, Ethiopia. I build robust mobile and web applications with Flutter, the MERN stack, and Laravel. From e-commerce and delivery platforms to data privacy tools, I turn practical ideas into reliable software. I work as a System Software Developer at INSA and am open to remote opportunities.";

function drawAboutPage(c: HTMLCanvasElement) {
  const ctx = c.getContext("2d");
  if (!ctx) return;
  const W = c.width, H = c.height, mid = W / 2;
  ctx.fillStyle = "#fffdf7";
  ctx.fillRect(0, 0, W, H);
  const g = ctx.createLinearGradient(mid - 50, 0, mid + 50, 0);
  g.addColorStop(0, "rgba(0,0,0,0)"); g.addColorStop(0.5, "rgba(0,0,0,0.15)"); g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g; ctx.fillRect(mid - 50, 0, 100, H);
  const pad = 120, maxW = mid - pad * 2;
  ctx.fillStyle = "#0f1d3d";
  ctx.font = "bold 130px Georgia, serif";
  ctx.fillText("About me", pad, 230);
  ctx.fillRect(pad, 270, 220, 10);
  ctx.fillStyle = "#111111";
  ctx.font = "600 78px Arial, Helvetica, sans-serif";
  const lines: string[] = []; let line = "";
  for (const w of ABOUT_TEXT.split(" ")) {
    const t = line ? line + " " + w : w;
    if (ctx.measureText(t).width > maxW) { lines.push(line); line = w; } else line = t;
  }
  if (line) lines.push(line);
  const lh = 112, top0 = 420, top1 = 200;
  const perPage = Math.floor((H - top0 - 100) / lh);
  lines.forEach((l, i) => {
    const page = i < perPage ? 0 : 1;
    const row = page ? i - perPage : i;
    ctx.fillText(l, page ? mid + pad : pad, (page ? top1 : top0) + row * lh);
  });
}
