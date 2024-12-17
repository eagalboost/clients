import React from "react";
import noise from "../assets/noise.svg";

const Sidebar = ({ setSelectedCategory, selectedCategory, isOpen }) => {
  const categories = [
    { name: "Programming & Tech", value: "programming-tech" },
    { name: "Graphics & Design", value: "graphics-design" },
    { name: "Digital Marketing", value: "digital-marketing" },
    { name: "Video & Animation", value: "video-animation" },
    { name: "Business", value: "business" },
    { name: "Writing & Translation", value: "writing-translation" },
  ];

  const handleClick = (category) => {
    setSelectedCategory(category.value);
  };

  return (
    <aside
      className={`fixed z-40 md:static ${
        isOpen ? "translate-x-0" : "-translate-x-[150%]"
      } top-24 left-0 md:top-auto md:left-auto h-[max-content] md:h-[max-content] mt-8 ml-8 w-64 p-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg shadow-lg transition-transform duration-300 ease-in-out md:translate-x-0`}
      style={{
        backgroundImage: `url(${noise})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <h3 className="text-white text-lg font-bold mb-4 font-roboto">
        Categories
      </h3>
      <ul className="space-y-4">
        {categories.map((category, index) => (
          <li
            key={index}
            onClick={() => handleClick(category)}
            className={`relative cursor-pointer text-sm lg:text-base p-1 md:p-3 rounded-lg font-openSans text-white transition-all duration-300 group ${
              selectedCategory === category.value
                ? "bg-white/30"
                : "bg-transparent hover:bg-white/30"
            }`}
          >
            <span className="relative z-10">{category.name}</span>

            <span
              className={`absolute -top-1/2 -left-1/2 w-[200%] h-[200%] rounded-full opacity-0 group-hover:opacity-100 ${
                selectedCategory === category.value ? "opacity-100" : ""
              } transition-opacity duration-300`}
              style={{
                background:
                  "radial-gradient(circle, rgba(232, 0, 151, 0.8), transparent)",
                filter: "blur(20px)",
                pointerEvents: "none",
                zIndex: -1,
              }}
            ></span>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
