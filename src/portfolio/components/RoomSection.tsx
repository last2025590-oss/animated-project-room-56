// @ts-nocheck -- wraps the ported 3D room from Ezadin's second portfolio
import { useEffect, useRef, useState } from "react";
import { createRoom } from "../room/roomScene";
import "./styles/Room.css";

const RoomSection = () => {
  const wrap = useRef(null);
  const canvas = useRef(null);
  const api = useRef(null);
  const [loaded, setLoaded] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dark, setDark] = useState(false);
  const [choice, setChoice] = useState(null);

  useEffect(() => {
    let room = null;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !room) {
        room = createRoom(wrap.current, canvas.current, {
          onLoaded: () => setLoaded(true),
          onFocusChange: setFocused,
          onThemeChange: (t) => setDark(t === "dark"),
          onChooseProject: setChoice,
        });
        api.current = room;
        io.disconnect();
      }
    }, { rootMargin: "300px" });
    io.observe(wrap.current);
    return () => { io.disconnect(); room?.dispose(); };
  }, []);

  return (
    <section className={`room-section ${dark ? "room-dark" : ""}`} id="room">
      <div className="room-head">
        <h2>My <span>Room</span></h2>
        <p>Drag to look around. Click the book to read about me, the light switch for night mode, or a project on the screen to open it.</p>
      </div>
      <div className="room-stage" ref={wrap}>
        <canvas ref={canvas} className="room-canvas" />
        {!loaded && <div className="room-loading">Loading room…</div>}
        <div className="room-controls">
          {focused ? (
            <button onClick={() => api.current?.reset()}>← Back</button>
          ) : (
            <>
              <button onClick={() => api.current?.showAbout()}>About me</button>
              <button onClick={() => api.current?.showProjects()}>Projects</button>
            </>
          )}
        </div>
        {choice && (
          <div className="room-choice" onClick={() => setChoice(null)}>
            <div onClick={(e) => e.stopPropagation()}>
              <p>Which version would you like to open?</p>
              <a href={choice.url} target="_blank" rel="noopener">Web</a>
              <a href={choice.mobileUrl} target="_blank" rel="noopener">Mobile / Admin</a>
              <button onClick={() => setChoice(null)}>Close</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default RoomSection;
