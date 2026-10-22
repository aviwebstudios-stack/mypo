import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ProjectDetails from "./pages/ProjectDetails";
import ScrollToTop from "./components/ScrollToTop";
import Spotify from "./components/Spotify";

const MIN_LOAD_TIME = 900; // ms, tweak this to make it show longer/shorter

function Home() {
  return (
    <div>
      <Hero />
      <Projects />
      <Spotify />
      <Footer />
    </div>
  );
}

function PageLoader({ hidden }) {
  return (
    <div
      className={`page-loader${hidden ? " page-loader-hidden" : ""}`}
      role="status"
      aria-label="Loading"
    >
      <div className="page-loader-spinner"></div>
    </div>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), MIN_LOAD_TIME);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <PageLoader hidden={!loading} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects/:id" element={<ProjectDetails />} />
      </Routes>
    </BrowserRouter>
  );
}