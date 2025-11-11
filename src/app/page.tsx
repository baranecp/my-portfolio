import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import LeftSocial from "./components/ui/LeftSocial";
import RightSocial from "./components/ui/RigthSocial";

export default function Home() {
  return (
    <div className='min-h-screen bg-background px-12 py-8'>
      <Navbar />
      <main className='mx-[120px] px-[150px]'>
        <LeftSocial />
        <RightSocial />
        <Hero />
      </main>
    </div>
  );
}
