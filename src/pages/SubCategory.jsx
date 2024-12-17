import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SubCategoryServiceCard from "../components/SubCategoryServiceCard";

const SubCategory = () => {
  const { subCategory } = useParams();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/services?subcategory=${subCategory}`
        );
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [subCategory]);

  return (
    <section className="max-w-[1440px] w-11/12 mt-4 rounded-md mx-auto p-6 bg-[#222222]">
      <h2 className="text-3xl font-roboto font-bold border-b-2 pb-2 border-[#333333] text-gray-100 capitalize mb-4 text-center">
        {subCategory.replace("-", " ")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.length > 0 ? (
          services.map((service) => <SubCategoryServiceCard key={service._id} service={service} />)
        ) : (
          <p className="text-gray-400 text-center col-span-full">
            No services found for this subcategory.
          </p>
        )}
      </div>
    </section>
  );
};

export default SubCategory;
