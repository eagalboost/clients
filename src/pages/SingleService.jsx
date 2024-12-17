import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/loadingSlice";

const SingleService = () => {
  const { subCategory, id } = useParams();
  const [service, setService] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedPackage, setSelectedPackage] = useState("basic");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      dispatch(showLoading());
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/services/single-service/${id}`
        );
        setService(response.data);
      } catch (error) {
        console.error("Error fetching service details:", error);
      } finally {
        dispatch(hideLoading());
      }
    };
    fetchService();
  }, [subCategory, id, dispatch]);

  if (!service) {
    return (
      <div className="text-gray-400 text-center mt-10">
        Loading service details...
      </div>
    );
  }

  const isVideo = (url) => url.endsWith(".mp4") || url.endsWith(".webm");

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const selectedPackageDetails = service.packages.find(
    (pkg) => pkg.name.toLowerCase() === selectedPackage
  );

  const handleContactClick = async (event) => {
    event.stopPropagation();

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const buyerId = storedUser?._id;
    const adminId = service.userId;

    console.log("Creating conversation with:", {
      buyerId: buyerId,
      adminId: adminId,
    });

    try {
      const existingConversationResponse = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/conversations?buyerId=${buyerId}&adminId=${adminId}`,
        { withCredentials: true }
      );

      if (existingConversationResponse.data.length > 0) {
        console.log(existingConversationResponse.data);
        navigate(`/messages/${existingConversationResponse.data[0]._id}`);
      } else {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/api/conversations`,
          {
            buyerId: buyerId,
            adminId: adminId,
          },
          { withCredentials: true }
        );

        const conversationId = response.data._id;
        navigate(`/messages/${conversationId}`);
      }
    } catch (error) {
      console.error("Error creating conversation:", error);
    }
  };

  const renderMedia = (url) => {
    if (isVideo(url)) {
      return (
        <video
          autoPlay
          controls
          muted
          className="w-full h-[350px] object-cover rounded-md border border-gray-600"
        >
          <source src={url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      );
    }
    return (
      <img
        src={url}
        alt={`Service Media ${selectedImageIndex + 1}`}
        className="w-full h-[350px] object-cover rounded-md border border-gray-600"
      />
    );
  };

  return (
    <section className="max-w-[1440px] w-11/12 mx-auto p-6 bg-[#1e1e1e] rounded-md mt-4">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <h1 className="text-xl md:text-3xl font-bold text-gray-200 mb-4">
            {service.title}
          </h1>
          <div className="mb-6">
            {renderMedia(
              [service.coverImage, ...(service.otherImages || [])][
                selectedImageIndex
              ]
            )}
          </div>

          {service.otherImages && service.otherImages.length > 0 && (
            <div
              className="flex gap-2 mt-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-600"
              style={{ whiteSpace: "nowrap" }}
            >
              {[service.coverImage, ...service.otherImages].map(
                (item, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer ${
                      selectedImageIndex === index
                        ? "border-red-500"
                        : "border-gray-600"
                    }`}
                    style={{
                      flex: "0 0 auto",
                      width: "80px",
                    }}
                    onClick={() => handleThumbnailClick(index)}
                  >
                    {isVideo(item) ? (
                      <div className="relative w-20 h-20 rounded-md border">
                        <video
                          src={item}
                          className="object-cover w-full h-full rounded-md"
                          muted
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-md">
                          <span className="text-white text-sm font-semibold">
                            ▶
                          </span>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={item}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md border"
                      />
                    )}
                  </div>
                )
              )}
            </div>
          )}

          <h2 className="text-xl font-semibold text-gray-300 mt-6 mb-4">
            About This Service
          </h2>
          <p className="text-gray-300 leading-relaxed">{service.desc}</p>

          {service.features && service.features.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                Features:
              </h3>
              <ul className="list-disc text-sm md:text-base list-inside text-gray-300">
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:w-1/3">
          <div className="bg-[#2b2b2b] p-6 rounded-md border border-gray-600">
            <div className="flex justify-between mb-6">
              {["basic", "standard", "premium"].map((pkg) => (
                <button
                  key={pkg}
                  className={`flex-1 text-center py-2 rounded-md mx-1 font-semibold text-sm transition-all duration-300 ${
                    selectedPackage === pkg
                      ? "bg-red-500 text-white"
                      : "bg-gray-700 text-gray-300 hover:bg-red-500 hover:text-white"
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
                </button>
              ))}
            </div>

            <div className="text-gray-300">
              {selectedPackageDetails ? (
                <>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-200 mb-4">
                    {selectedPackageDetails.name} Package
                  </h3>
                  <p className="mb-4">{selectedPackageDetails.desc}</p>
                  <p className="text-xl md:text-2xl font-bold text-red-500 mb-2">
                    ${selectedPackageDetails.price || "N/A"}
                  </p>
                  <p className="mb-4">
                    Revisions: {selectedPackageDetails.revisionNumber || "N/A"}
                  </p>
                  <p className="mb-6">
                    Delivery Time:{" "}
                    {selectedPackageDetails.deliveryTime || "N/A"} days
                  </p>
                  <button className="bg-red-500 text-sm md:text-base text-white py-2 px-4 rounded-md w-full mb-3 hover:bg-red-600 transition-all">
                    Order Now
                  </button>
                  <button
                    className="bg-gray-700 text-sm md:text-base text-gray-300 py-2 px-4 rounded-md w-full hover:bg-gray-600 transition-all"
                    onClick={handleContactClick}
                  >
                    Contact Seller
                  </button>
                </>
              ) : (
                <p>No details available for this package.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleService;
