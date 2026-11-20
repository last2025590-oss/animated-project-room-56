// @ts-nocheck -- imported as-is from the original portfolio repo
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

const Scene = ({ standalone = false, onReady, onError }: { standalone?: boolean; onReady?: () => void; onError?: () => void }) => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [character, setChar] = useState<THREE.Object3D | null>(null);
  useEffect(() => {
    if (canvasDiv.current) {
      let rect = canvasDiv.current.getBoundingClientRect();
      let container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      const renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.z = 10;
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();
      let disposed = false;
      let rafId = 0;
      let readyFrame = false;
      let reportedReady = false;
      let introTimer;
      let removeHover;
      let resize;

      const light = setLighting(scene);
      let progress = setProgress((value) => {
        if (!disposed) setLoading(value);
      });
      const { loadCharacter } = setCharacter(renderer, scene, camera, standalone);

      loadCharacter().then(async (gltf) => {
        if (gltf && !disposed) {
          await light.ready;
          if (disposed) return;
          const animations = setAnimations(gltf);
          if (hoverDivRef.current) removeHover = animations.hover(gltf, hoverDivRef.current);
          mixer = animations.mixer;
          let character = gltf.scene;
          setChar(character);
          scene.add(character);
          headBone = character.getObjectByName("spine006") || null;
          screenLight = character.getObjectByName("screenlight") || null;
          if (standalone) {
            light.turnOnLights(true);
            animations.startIntro();
            mixer.update(0.05);
            readyFrame = true;
          } else progress.loaded().then(() => {
            introTimer = setTimeout(() => {
              light.turnOnLights();
              animations.startIntro();
            }, 2500);
          });
          resize = () => standalone ? (() => {
            const element = canvasDiv.current;
            if (!element) return;
            camera.aspect = element.clientWidth / element.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(element.clientWidth, element.clientHeight);
          })() : handleResize(renderer, camera, canvasDiv, character);
          window.addEventListener("resize", resize);
        }
      }).catch(() => { if (!disposed) { progress.clear(); onError?.(); } });

      let mouse = { x: 0, y: 0 },
        interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };
      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }
      const animate = () => {
        if (disposed) return;
        rafId = requestAnimationFrame(animate);
        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }
        const delta = clock.getDelta();
        if (mixer) {
          mixer.update(delta);
        }
        renderer.render(scene, camera);
        if (readyFrame && !reportedReady) {
          reportedReady = true;
          canvasDiv.current?.setAttribute("data-character-ready", "true");
          onReady?.();
        }
      };
      animate();
      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        clearTimeout(debounce);
        clearTimeout(introTimer);
        removeHover?.();
        progress.clear();
        scene.clear();
        renderer.dispose();
        if (resize) window.removeEventListener("resize", resize);
        document.removeEventListener("mousemove", onMouseMove);
        renderer.domElement.remove();
        renderer.forceContextLoss();
        if (landingDiv) {
          document.removeEventListener("mousemove", onMouseMove);
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }
      };
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

export default Scene;
