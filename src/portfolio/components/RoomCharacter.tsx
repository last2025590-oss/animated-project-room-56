// @ts-nocheck -- shows the animated character inside the room without the full-page loader
import { LoadingContext } from "../context/LoadingProvider";
import Scene from "./Character/Scene";
import "./styles/Landing.css";

const value = { isLoading: false, setIsLoading: () => {}, setLoading: () => {} };

const RoomCharacter = ({ onReady, onError, hidden = false }) => (
  <LoadingContext.Provider value={value}>
    <div className={`room-character character-loaded ${hidden ? "room-character-hidden" : ""}`}>
      <Scene standalone onReady={onReady} onError={onError} />
    </div>
  </LoadingContext.Provider>
);
export default RoomCharacter;
