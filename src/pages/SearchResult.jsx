import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SubCategoryServiceCard from "../components/SubCategoryServiceCard";
import { showLoading, hideLoading } from "../redux/loadingSlice";

const SearchResult = () => {
  const [services, setServices] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        dispatch(showLoading());
        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/services?search=${encodeURIComponent(searchQuery)}`
        );
        setServices(res.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        dispatch(hideLoading());
      }
    };

    if (searchQuery) {
      fetchServices();
    }
  }, [searchQuery, dispatch]);

  return (
    <section className="max-w-[1440px] w-11/12 mt-4 rounded-md mx-auto p-6 bg-[#222222] text-gray-100">
      <h2 className="text-3xl font-bold border-b-2 pb-2 border-[#333333] text-center mb-4">
        Search Results for "{searchQuery}"
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <SubCategoryServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p className="col-span-full text-center">
            No services found for your search.
          </p>
        )}
      </div>
    </section>
  );
};

export default SearchResult;
