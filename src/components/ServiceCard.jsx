import React from "react";
import noise from "../assets/noise.svg";
import { Link } from "react-router-dom";

const ServiceCard = ({ icon: Icon, heading, content, iconColor, url }) => {
  return (
    <Link
      to={url}
      className="group relative bg-white/10 rounded-xl text-primaryText shadow-lg backdrop-blur-lg border border-white/20 flex flex-col justify-center items-center gap-4 px-4 py-8 transition-transform duration-300 transform hover:-translate-y-1"
      style={{ backgroundImage: `url(${noise})`, backgroundSize: "cover" }}
    >
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] bg-gradient-radial from-cyan-400/80 to-transparent blur-[20px]"></div>
      </div>

      <div className={iconColor}>
        <Icon className="w-12 h-12" />
      </div>

      <div className="text-center flex flex-col gap-2">
        <h4 className="font-roboto text-lg">{heading}</h4>
        <p className="font-openSans text-sm">{content}</p>
      </div>
    </Link>
  );
};

export default ServiceCard;
