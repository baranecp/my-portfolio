import About from "./components/About";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import FlashlightWrapper from "./components/ui/FlashlightWrapper";
import LeftSocial from "./components/ui/LeftSocial";
import RightSocial from "./components/ui/RigthSocial";

export default function Home() {
  return (
    <FlashlightWrapper>
      <div className='px-12 py-8'>
        <Navbar />
        <LeftSocial />
        <RightSocial />
        <main>
          <Hero />
          <About />
        </main>
      </div>
    </FlashlightWrapper>
  );
}
