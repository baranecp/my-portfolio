import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LeftSocial from "./components/ui/LeftSocial";
import RightSocial from "./components/ui/RigthSocial";

export default function Home() {
  return (
    <div className='px-12 pt-8'>
      <LeftSocial />
      <RightSocial />
      <Navbar />
      <main>
        <Hero />
        <About />
      </main>
    </div>
  );
}
