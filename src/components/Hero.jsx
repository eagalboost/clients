import React from "react";
import { useLocation } from "react-router-dom";
import noise from "../assets/noise.svg";
import { Search } from "lucide-react";
import logo1 from "../assets/Partners/coursera.svg";
import logo2 from "../assets/Partners/google.svg";
import logo3 from "../assets/Partners/hubspot.svg";
import logo4 from "../assets/Partners/meta.svg";
import logo5 from "../assets/Partners/udemy.svg";

const Hero = ({
  bloomColor1,
  bloomColor2,
  heroHeight = "450px",
  bloomSize = "550px",
  title,
  paragraph,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const logos = [
    { src: logo1, alt: "Coursera" },
    { src: logo2, alt: "Google Partners" },
    { src: logo3, alt: "HubSpot" },
    { src: logo4, alt: "Meta" },
    { src: logo5, alt: "Udemy" },
  ];

  return (
    <div
      className="relative w-11/12 max-w-[1440px] mx-auto mt-6 bg-white/10 rounded-2xl shadow-lg backdrop-blur-lg border border-white/20 flex flex-col justify-center items-center overflow-hidden"
      style={{
        height: heroHeight,
        backgroundImage: `url(${noise})`,
        backgroundSize: "cover",
      }}
    >
      <div className="relative z-10 flex flex-col items-center space-y-2">
        <div className="text-center">
          {isHomePage ? (
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold font-roboto drop-shadow-[0_0_10px_rgba(255,255,255,0.4)] text-primaryText">
              Find the right freelancer <br /> service, right away
            </h1>
          ) : (
            <>
              <h1 className="text-2xl md:text-4xl lg:text-4xl font-bold font-roboto text-primaryText">
                {title}
              </h1>
              <p className="mt-4 lg:text-2xl font-openSans text-gray-300">{paragraph}</p>
            </>
          )}

          {isHomePage && (
            <div className="mt-6 relative w-[80%] max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search for services..."
                className="px-4 py-3 w-full rounded-lg shadow-md text-gray-800 focus:outline-none focus:ring-1 focus:ring-primaryRgb focus:shadow-lg transition-all duration-300"
              />
              <button className="absolute top-1/2 right-3 transform -translate-y-1/2 text-primaryText p-1 md:p-2 rounded-md bg-primaryRgb hover:bg-[#333] transition-colors duration-300">
                <Search className="w-6 h-6" />
              </button>
            </div>
          )}
        </div>

        {isHomePage && (
          <div className="hidden lg:flex space-x-8">
            {logos.map((logo, index) => (
              <img
                key={index}
                src={logo.src}
                alt={logo.alt}
                className="w-[150px]"
              />
            ))}
          </div>
        )}
      </div>

      <div
        className="absolute top-[-150px] left-[-200px] opacity-80 blur-lg animate-moveBefore"
        style={{
          height: bloomSize,
          width: bloomSize,
          background: `radial-gradient(circle, ${bloomColor1}, rgba(0,0,0,0) 70%)`,
          borderRadius: "50%",
        }}
      ></div>

      <div
        className="absolute bottom-[-250px] right-[-200px] opacity-80 blur-lg animate-moveAfter"
        style={{
          height: bloomSize,
          width: bloomSize,
          background: `radial-gradient(circle, ${bloomColor2}, rgba(0,0,0,0) 70%)`,
          borderRadius: "50%",
        }}
      ></div>
    </div>
  );
};

export default Hero;
