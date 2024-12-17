import React from "react";
import ServiceCard from "./ServiceCard";
import {
  CodeXml,
  Brush,
  TrendingUp,
  Clapperboard,
  Handshake,
  SquarePen,
} from "lucide-react";

const ServiceCards = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 w-11/12 max-w-[1440px] mt-8 mx-auto">
      <ServiceCard
        icon={CodeXml}
        heading="Programming & Tech"
        content="Get expert help with coding and tech solutions."
        iconColor="text-primaryRgb"
        url="/programming-tech"
      />
      <ServiceCard
        icon={Brush}
        heading="Graphics Design"
        content="Create stunning designs for your brand."
        iconColor="text-primaryRgb"
        url="/graphics-design"
      />
      <ServiceCard
        icon={TrendingUp}
        heading="Digital Marketing"
        content="Promote your business with targeted strategies."
        iconColor="text-primaryRgb"
        url="/digital-marketing"
      />
      <ServiceCard
        icon={Clapperboard}
        heading="Video & Animation"
        content="Create engaging videos and animations."
        iconColor="text-primaryRgb"
        url="/video-animation"
      />
      <ServiceCard
        icon={Handshake}
        heading="Business"
        content="Grow your business with professional consulting."
        iconColor="text-primaryRgb"
        url="/business"
      />
      <ServiceCard
        icon={SquarePen}
        heading="Writing & Translation"
        content="Get top-quality writing and translation services."
        iconColor="text-primaryRgb"
        url="/writing-translation"
      />
    </section>
  );
};

export default ServiceCards;
