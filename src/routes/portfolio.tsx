import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";
import "../portfolio/index.css";

const PortfolioApp = lazy(() => import("../portfolio/App"));

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Ezadin Badiru - Creative Full Stack Developer | Mobile Developer" },
      { name: "description", content: "Interactive 3D portfolio of a creative full stack developer and mobile developer." },
      { property: "og:title", content: "Ezadin Badiru - Creative Full Stack Developer" },
      { property: "og:description", content: "Interactive 3D portfolio of a creative full stack developer and mobile developer." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const t = window.setInterval(() => {
      const el = document.getElementById(id);
      if (el) { el.scrollIntoView({ behavior: "smooth" }); window.clearInterval(t); }
    }, 500);
    const stop = window.setTimeout(() => window.clearInterval(t), 15000);
    return () => { window.clearInterval(t); window.clearTimeout(stop); };
  }, []);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <PortfolioApp />
    </Suspense>
  );
}
