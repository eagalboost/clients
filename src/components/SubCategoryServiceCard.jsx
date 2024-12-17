import React from 'react';
import { Link } from 'react-router-dom';
import { Star } from 'lucide-react';
import noise from '../assets/noise.svg';

const SubCategoryServiceCard = ({ service }) => {
  return (
    <Link
      to={`/${service.subCategory}/${service._id}`}
      className="group relative p-4 block bg-white/10 rounded-lg backdrop-blur-lg border border-white/20 shadow-lg transition-all duration-300"
      style={{
        backgroundImage: `url(${noise})`,
        backgroundSize: 'cover',
      }}
    >
      <div className="absolute inset-0 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[200px] h-[200px] bg-gradient-radial from-cyan-500/80 to-transparent blur-[20px]"></div>
      </div>

      <div className="relative">
        {service.coverImage.endsWith(".mp4") ? (
          <div className="relative">
            <video
              muted
              autoPlay
              loop
              className="w-full h-48 object-cover rounded-md group-hover:opacity-90 transition-opacity duration-300"
            >
              <source src={service.coverImage} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <button
              onClick={(e) => {
                e.preventDefault();
                const videoElement = e.currentTarget.previousElementSibling;
                if (videoElement.paused) {
                  videoElement.play();
                } else {
                  videoElement.pause();
                }
              }}
              className="absolute inset-0 flex items-center justify-center bg-black/40 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-10 h-10"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.25v13.5l13.5-6.75-13.5-6.75z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <img
            src={service.coverImage}
            alt={service.shortTitle}
            className="w-full h-48 object-cover rounded-md group-hover:opacity-90 transition-opacity duration-300"
          />
        )}
      </div>

      <div className="py-4">
        <h3 className="text-lg font-bold font-roboto text-gray-200">
          {service.shortTitle}
        </h3>

        <p className="text-base text-primaryText mt-2 line-clamp-2">
          {service.shortDesc}
        </p>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1 text-yellow-400">
            <Star className="w-5 h-5" />
            <span className="text-base font-medium">{service.starNumber}</span>
            <span className="text-sm text-gray-400">({service.sales})</span>
          </div>

          <p className="text-base font-semibold text-red-600">
            Starting at ${service.packages[0]?.price || "N/A"}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default SubCategoryServiceCard;
