import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ScrollProgress from "@/components/ScrollProgress";
import CustomCursor from "@/components/CustomCursor";
import AuroraBackground from "@/components/AuroraBackground";

const About     = lazy(() => import("@/components/About"));
const Skills    = lazy(() => import("@/components/Skills"));
const Projects  = lazy(() => import("@/components/Projects"));
const Education = lazy(() => import("@/components/Education"));
const Contact   = lazy(() => import("@/components/Contact"));

const Fallback = () => (
  <div style={{ padding: "80px 0", display: "flex", justifyContent: "center" }}>
    <div style={{ width: 24, height: 24, border: "2px solid rgba(0,212,170,0.3)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

const Divider = () => (
  <div style={{ height: 1, background: "linear-gradient(to right, transparent, rgba(0,212,170,0.08), transparent)", margin: "0 24px" }} />
);

export default function Index() {
  return (
    <>
      <CustomCursor />
      <ScrollProgress />
      <AuroraBackground />
      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />
        {/* Spacer so content doesn't hide under fixed navbar */}
        <div style={{ height: 56 }} />
        <main style={{ width: "100%", overflowX: "hidden" }}>
          <Hero />
          <Divider />
          <Suspense fallback={<Fallback />}><About /></Suspense>
          <Divider />
          <Suspense fallback={<Fallback />}><Skills /></Suspense>
          <Divider />
          <Suspense fallback={<Fallback />}><Projects /></Suspense>
          <Divider />
          <Suspense fallback={<Fallback />}><Education /></Suspense>
          <Divider />
          <Suspense fallback={<Fallback />}><Contact /></Suspense>
        </main>
      </div>
    </>
  );
}
