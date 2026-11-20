// @ts-nocheck -- full-screen home based on Ezadin's 3D room portfolio
import { useEffect, useRef, useState } from "react";
import { createRoom } from "../room/roomScene";
import { screenSectionTitles } from "../room/sectionScreens";
import RoomCharacter from "./RoomCharacter";
import "./styles/Room.css";


const RoomHome = () => {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const api = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [focused, setFocused] = useState(false);
  const [dark, setDark] = useState(false);
  const [choice, setChoice] = useState(null);
  const [open, setOpen] = useState(false);
  const [view, setView] = useState("url");

  useEffect(() => {
    const room = createRoom(wrap.current, canvas.current, {
      onLoaded: () => { setProgress(100); window.setTimeout(() => setLoaded(true), 400); },
      onProgress: (pct) => setProgress((p) => Math.max(p, pct)),
      onFocusChange: setFocused,
      onThemeChange: (t) => setDark(t === "dark"),
      onChooseProject: (c) => { setView(c.url ? "url" : "mobileUrl"); setChoice(c); },
    });
    api.current = room;
    (window as any).__room = room;
    return () => room.dispose();
  }, []);

  // Keep the bar moving while the model downloads, even if its size is unknown
  useEffect(() => {
    if (loaded) return;
    const t = window.setInterval(() => {
      setProgress((p) => (p < 90 ? p + Math.round(Math.random() * 4) : p));
    }, 300);
    return () => window.clearInterval(t);
  }, [loaded]);

  return (
    <div className={`room-home ${dark ? "room-dark" : ""}`}>
      <div className="room-stage room-full" ref={wrap}>
        <canvas ref={canvas} className="room-canvas" />
        <div className={`room-loader ${loaded ? "room-loader-done" : ""}`}>
          <div className="room-loader-box">
            <img src="/__l5e/assets-v1/12684db0-453d-44ad-a25d-d40c19d4edcd/logo-e.png" alt="" className="room-loader-logo" />
            <div className="room-loader-bar">
              <div className="room-loader-fill" style={{ width: `${progress}%` }} />
            </div>
            <p className="room-loader-text">Loading room… {progress}%</p>
          </div>
        </div>
      </div>
      <header className="room-top">
        <a href="/" className="room-logo"><img src="/__l5e/assets-v1/12684db0-453d-44ad-a25d-d40c19d4edcd/logo-e.png" alt="" className="room-logo-mark" />Ezadin<span>.</span></a>
        <button className="room-menu-btn" onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}</button>
      </header>
      <nav className={`room-side ${open ? "open" : ""}`}>
        {focused ? (
          <button onClick={() => { api.current?.reset(); }}>← Back to room</button>
        ) : (
          <>
            <button onClick={() => { api.current?.showAbout(); setOpen(false); }}>About me</button>
            <button onClick={() => { api.current?.showProjects(); setOpen(false); }}>Project screens</button>
          </>
        )}
        {Object.keys(screenSectionTitles).map((k) => (
          <button key={k} onClick={() => { api.current?.showSection(k); setOpen(false); }}>{screenSectionTitles[k]}</button>
        ))}
        <a href="mailto:ezadinbadru55@gmail.com">Email me</a>
        <a href="https://www.linkedin.com/in/ezadin-badiru-966643331/" target="_blank" rel="noopener">LinkedIn</a>
      </nav>
      {loaded && !focused && <RoomCharacter />}
      <p className="room-hint">Drag to look around · click the book, the light switch or a project screen</p>
      {choice && (
        <div className="room-choice" onClick={() => setChoice(null)}>
          <div className="room-choice-wide" onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
              {choice.url && <button onClick={() => setView("url")}>Web</button>}
              {choice.mobileUrl && <button onClick={() => setView("mobileUrl")}>Mobile / Admin</button>}
              <button onClick={() => setChoice(null)}>Close</button>
            </div>
            <div className="room-project">
              <iframe src={choice[view] || choice.url || choice.mobileUrl} title="Project preview" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomHome;
