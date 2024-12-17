import React from "react";
import { Link } from "react-router-dom";

const CategoryCard = ({ image, title, links, backgroundImage }) => {
  return (
    <div
      className="relative w-full bg-white/10 rounded-lg overflow-hidden border border-white/20 shadow-lg backdrop-blur-lg flex flex-col"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
      }}
    >
      <div>
        <img
          src={image}
          alt={title}
          className="w-full h-[220px] object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-roboto text-primaryText text-xl lg:text-2xl">{title}</h3>
      </div>
      <div className="text-primaryText text-sm lg:text-base flex flex-col p-4 space-y-2">
        {links.map((link, index) => (
          <Link key={index} to={link.url} className="hover:underline font-openSans">
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryCard;
