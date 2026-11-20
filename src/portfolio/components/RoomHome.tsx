// @ts-nocheck -- the imported room API is vanilla Three.js
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Award, BriefcaseBusiness, Code2, Grid2X2, Mail, Menu, UserRound, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createRoom } from "../room/roomScene";
import { getSectionScreens, screenSectionTitles } from "../room/sectionScreens";
import { roomIsReady, roomLoadingProgress } from "../room/readiness";
import { wallLayout } from "../room/wallLayout";
import RoomCharacter from "./RoomCharacter";
import "./styles/Room.css";

const icons = { skills: Code2, experience: BriefcaseBusiness, certificates: Award, contact: Mail };
const RoomHome = () => {
  const wrap = useRef(null), canvas = useRef(null), api = useRef(null);
  const [roomReady, setRoomReady] = useState(false);
  const [characterReady, setCharacterReady] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dark, setDark] = useState(false);
  const [choice, setChoice] = useState(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("url");
  const [section, setSection] = useState(null);
  const [page, setPage] = useState(0);
  const loaded = roomIsReady(roomReady, characterReady);
  const onCharacterReady = useCallback(() => setCharacterReady(true), []);
  const onError = useCallback(() => setError(true), []);
  useEffect(() => {
    const room = createRoom(wrap.current, canvas.current, {
      onLoaded: () => { setProgress(100); setRoomReady(true); },
      onProgress: (pct) => setProgress(p => Math.max(p, pct)), onError,
      onFocusChange: setFocused,
      onThemeChange: t => setDark(t === "dark"),
      onChooseProject: c => { setView(c.url ? "url" : "mobileUrl"); setChoice(c); },
    });
    api.current = room;
    if (import.meta.env.DEV) window.__room = room;
    return () => { room.dispose(); if (import.meta.env.DEV) delete window.__room; };
  }, [onError]);
  const choose = (key) => {
    setSection(key); setPage(0); setOpen(false);
    if (key === "about") api.current?.showAbout();
    else if (key === "projects") api.current?.showProjects();
    else api.current?.showSection(key);
  };
  const back = () => { setSection(null); setPage(0); api.current?.reset(); setOpen(false); };
  const pages = section && screenSectionTitles[section] ? wallLayout(getSectionScreens(section).length).pages : 1;
  const changePage = next => { setPage(next); api.current?.showSection(section, next); };
  return (
    <div className={`room-home ${dark ? "room-dark" : ""}`} data-scene-ready={loaded ? "true" : undefined}>
      <div className="room-stage room-full" ref={wrap}><canvas ref={canvas} className="room-canvas" /></div>
      <RoomCharacter onReady={onCharacterReady} onError={onError} hidden={focused} />
      <div className={`room-loader ${loaded ? "room-loader-done" : ""}`} role="status" aria-live="polite">
        <div className="room-loader-box">
          <img src="/__l5e/assets-v1/12684db0-453d-44ad-a25d-d40c19d4edcd/logo-e.png" alt="" className="room-loader-logo" />
          <h1>Ezadin Badiru<span>.</span></h1>
          <p className="room-loader-role">Full-stack & Flutter developer</p>
          <div className="room-loader-bar" role="progressbar" aria-valuenow={roomLoadingProgress(progress, characterReady)} aria-valuemin={0} aria-valuemax={100}><div className="room-loader-fill" style={{ width: `${roomLoadingProgress(progress, characterReady)}%` }} /></div>
          <p className="room-loader-text">{error ? "Some room assets couldn’t load." : !roomReady ? "Preparing the room" : !characterReady ? "Preparing the animated character" : "Welcome"}<span>{roomLoadingProgress(progress, characterReady)}%</span></p>
          {error && <Button onClick={() => window.location.reload()} variant="outline">Retry</Button>}
        </div>
      </div>
      <header className="room-top">
        <a href="/" className="room-logo"><img src="/__l5e/assets-v1/12684db0-453d-44ad-a25d-d40c19d4edcd/logo-e.png" alt="" className="room-logo-mark" />Ezadin<span>.</span></a>
        <Button className="room-menu-btn" variant="outline" size="icon" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button>
      </header>
      <nav className={`room-side ${open ? "open" : ""}`} aria-label="Portfolio sections">
        <span className="room-nav-label">PORTFOLIO</span>
        {focused && <Button variant="ghost" className="room-back" onClick={back}><ArrowLeft />Back to room</Button>}
        <Button variant="ghost" data-active={section === "about"} disabled={!loaded} onClick={() => choose("about")}><UserRound />About me</Button>
        <Button variant="ghost" data-active={section === "projects"} disabled={!loaded} onClick={() => choose("projects")}><Grid2X2 />Project screens</Button>
        {Object.keys(screenSectionTitles).map(key => { const Icon = icons[key]; return <Button variant="ghost" key={key} data-active={section === key} disabled={!loaded} onClick={() => choose(key)}><Icon />{screenSectionTitles[key]}</Button>; })}
        <div className="room-nav-links"><Button asChild variant="ghost"><a href="mailto:ezadinbadru55@gmail.com"><Mail />Email me</a></Button><Button asChild variant="ghost"><a href="https://www.linkedin.com/in/ezadin-badiru-966643331/" target="_blank" rel="noopener noreferrer"><ExternalLink />LinkedIn</a></Button></div>
      </nav>
      {focused && section && <div className="room-section-caption"><span>{screenSectionTitles[section] || (section === "about" ? "About me" : "Selected projects")}</span>{pages > 1 && <div className="room-pagination"><Button variant="ghost" size="icon" aria-label="Previous wall page" disabled={page === 0} onClick={() => changePage(page - 1)}><ArrowLeft /></Button><span>{page + 1} / {pages}</span><Button variant="ghost" size="icon" aria-label="Next wall page" disabled={page === pages - 1} onClick={() => changePage(page + 1)}><ArrowRight /></Button></div>}<Button variant="ghost" size="icon" aria-label="Back to room" onClick={back}><X /></Button></div>}
      {choice && <div className="room-choice" onClick={() => setChoice(null)}><div className="room-choice-wide" onClick={e => e.stopPropagation()}><div className="room-choice-toolbar">{choice.url && <Button variant="outline" onClick={() => setView("url")}>Web</Button>}{choice.mobileUrl && <Button variant="outline" onClick={() => setView("mobileUrl")}>Mobile / Admin</Button>}<Button variant="outline" size="icon" aria-label="Close project" onClick={() => setChoice(null)}><X /></Button></div><div className="room-project"><iframe src={choice[view] || choice.url || choice.mobileUrl} title="Project preview" /></div></div></div>}
    </div>
  );
};
export default RoomHome;
