import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import "../portfolio/index.css";

const RoomHome = lazy(() => import("../portfolio/components/RoomHome"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ezadin Badiru - Flutter & Full-Stack Developer from Ethiopia" },
      { name: "description", content: "Explore Ezadin Badiru's interactive 3D room: about, projects, skills, experience, certificates and contact." },
      { property: "og:title", content: "Ezadin Badiru - Flutter & Full-Stack Developer" },
      { property: "og:description", content: "Explore Ezadin Badiru's interactive 3D room portfolio." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <RoomHome />
    </Suspense>
  );
}
