import React from "react";
import Hero from "../components/Hero";
import ServiceCards from "../components/ServiceCards";
import HomeVideo from "../components/HomeVideo";

const Home = () => {
  return (
    <div>
      <Hero
        bloomColor1="rgba(0, 220, 238, 0.8)"
        bloomColor2="rgba(232, 0, 151, 0.8)"
        heroHeight="450px"
        bloomSize="600px"
      />

      <ServiceCards />
      <HomeVideo/>
    </div>
  );
};

export default Home;
