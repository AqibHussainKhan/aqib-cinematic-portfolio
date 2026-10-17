import Header from "./components/Header";
import Hero from "./components/Hero";
import { About, Education, Expertise, Skills } from "./components/Sections";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { IconLibrary } from "./components/Icon";
import { useMotionPreference, usePageExperience } from "./hooks/useExperience";
import "./App.css";

export default function App() {
  const [motion, toggleMotion] = useMotionPreference();
  usePageExperience(motion);
  return (
    <>
      <IconLibrary />
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Header />
      <main id="main-content">
        <Hero motion={motion} />
        <About />
        <Skills />
        <Expertise />
        <Projects />
        <Education />
        <Contact />
      </main>
      <Footer motion={motion} toggleMotion={toggleMotion} />
    </>
  );
}
