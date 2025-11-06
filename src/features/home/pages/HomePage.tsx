"use client";
import CourtSection from "../components/CourtSection";
import HeroSection from "../components/HeroSection";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center gap-4">
      <HeroSection />
      <CourtSection />
    </div>
  );
};

export default HomePage;
