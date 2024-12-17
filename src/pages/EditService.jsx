import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { showLoading, hideLoading } from "../redux/loadingSlice";
import { useDispatch } from "react-redux";
import uploadImage from "../utils/uploadImage";

const EditService = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const subCategoryOptions = {
    "programming-tech": [
      "website-development",
      "website-maintenance",
      "wordpress",
      "shopify",
      "custom-websites",
      "mobile-app-development",
      "cross-platform-apps",
      "android-app-development",
      "ios-app-development",
      "mobile-app-maintenance",
      "wix",
      "webflow",
      "godaddy",
      "squarespace",
      "woocommerce",
      "support-it",
      "cloud-computing",
      "cyber-security",
      "convert-files",
    ],
    "graphics-design": [
      "logo-design",
      "brand-style-guides",
      "business-cards-stationary",
      "fonts-typography",
      "web-design",
      "app-design",
      "ux-design",
      "landing-page-design",
      "icon-design",
      "illustration",
      "children-book-illustration",
      "pattern-design",
      "cartoon-comics",
      "image-editing",
      "presentation-design",
      "infographic-design",
      "resume-design",
      "packaging-label-design",
      "book-design",
      "book-covers",
      "album-cover-design",
      "social-media-design",
      "thumbnail-design",
      "email-design",
      "web-banners",
      "t-shirt-marchandise",
      "fashion-design",
      "jewelry-design",
      "3d-architecture",
      "3d-industrial-design",
      "3d-fashion-garment",
      "3d-landscape-design",
      "3d-jewelry-design",
    ],
    "digital-marketing": [
      "search-engine-optimization",
      "search-engine-marketing",
      "local-seo",
      "ecommerce-seo",
      "video-seo",
      "social-media-marketing",
      "paid-social-media",
      "social-commerce",
      "influencer-marketing",
      "community-management",
      "video-marketing",
      "ecommerce-marketing",
      "affiliate-marketing",
      "display-advertising",
      "marketing-strategy",
      "marketing-advice",
      "web-analytics",
    ],
    "video-animation": [
      "video-editing",
      "visual-effect",
      "intro-outro-videos",
      "video-templates-editing",
      "subtitle-captions",
      "2d-animation",
      "3d-animation",
      "character-animation",
      "whiteboard-animation",
      "explainer-videos",
      "animated-logos",
      "lottie-web-animation",
      "text-animation",
      "motion-tracking",
      "transition-effects",
      "video-commercials",
      "social-media-videos",
      "slideshow-videos",
      "explainer-video-production",
    ],
    business: [
      "market-research",
      "business-plan",
      "business-consulting",
      "software-management",
      "virtual-assistant",
      "ecommerce-management",
      "project-management",
      "sales",
      "lead-generation",
      "call-center-calling",
      "customer-care",
    ],
    "writing-translation": [
      "blog-writing",
      "copywriting",
      "website-content",
      "creative-writing",
      "speech-writing",
      "book-formatting",
      "book-ebook-writing",
      "beta-reading",
      "proofreading-editing",
      "translation",
      "transcription",
      "localization",
    ],
  };

  useEffect(() => {
    const fetchServiceDetails = async () => {
      dispatch(showLoading());
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/services/single-service/${id}`,
          { withCredentials: true }
        );
        const service = response.data;

        Object.keys(service).forEach((key) => {
          if (key === "packages" || key === "features") {
            setValue(key, service[key] || []);
          } else {
            setValue(key, service[key]);
          }
        });
      } catch (error) {
        toast.error("Failed to fetch service details.");
      } finally {
        dispatch(hideLoading());
      }
    };

    fetchServiceDetails();
  }, [id, dispatch, setValue]);

  const onSubmit = async (data) => {
    dispatch(showLoading());
    try {
      const coverImageUrl = data.coverImage
        ? await uploadImage(data.coverImage[0])
        : null;
      const otherImageUrls = data.otherImages
        ? await Promise.all(Array.from(data.otherImages).map(uploadImage))
        : [];

      const updatedData = {
        ...data,
        coverImage: coverImageUrl || data.coverImage,
        otherImages: otherImageUrls.length ? otherImageUrls : data.otherImages,
      };

      await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/services/${id}`,
        updatedData,
        { withCredentials: true }
      );

      toast.success("Service updated successfully!");
      navigate("/admin/services");
    } catch (error) {
      toast.error("Failed to update service. Please try again.");
    } finally {
      dispatch(hideLoading());
    }
  };

  return (
    <div className="p-6 text-white bg-[#333333] max-w-[800px] mx-auto rounded-md mt-4">
      <h1 className="text-center text-3xl font-bold mb-4 font-roboto">
        Edit Service
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <input
          {...register("title")}
          placeholder="Service Title"
          className="w-full p-2 rounded bg-gray-700"
        />
        {errors.title && <p className="text-red-500">{errors.title.message}</p>}

        <select
          {...register("category")}
          onChange={(e) => setValue("subCategory", "")}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="">Select Category</option>
          {Object.keys(subCategoryOptions).map((category) => (
            <option key={category} value={category}>
              {category.replace("-", " ")}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="text-red-500">{errors.category.message}</p>
        )}

        <select
          {...register("subCategory")}
          className="w-full p-2 rounded bg-gray-700"
        >
          <option value="">Select Subcategory</option>
          {watch("category") &&
            subCategoryOptions[watch("category")]?.map((sub) => (
              <option key={sub} value={sub}>
                {sub.replace("-", " ")}
              </option>
            ))}
        </select>
        {errors.subCategory && (
          <p className="text-red-500">{errors.subCategory.message}</p>
        )}

        <input
          {...register("coverImage", { required: false })}
          type="file"
          className="w-full p-2 rounded bg-gray-700"
        />
        <input
          {...register("otherImages", { required: false })}
          type="file"
          multiple
          className="w-full p-2 rounded bg-gray-700"
        />

        <textarea
          {...register("desc")}
          placeholder="Service Description"
          className="w-full p-2 rounded bg-gray-700"
        />
        {errors.desc && <p className="text-red-500">{errors.desc.message}</p>}

        <input
          {...register("shortTitle")}
          placeholder="Short Title"
          className="w-full p-2 rounded bg-gray-700"
        />
        {errors.shortTitle && (
          <p className="text-red-500">{errors.shortTitle.message}</p>
        )}

        <textarea
          {...register("shortDesc")}
          placeholder="Short Description"
          className="w-full p-2 rounded bg-gray-700"
        />
        {errors.shortDesc && (
          <p className="text-red-500">{errors.shortDesc.message}</p>
        )}

        <div>
          <label className="block font-bold mb-2">Features</label>
          {watch("features")?.map((feature, index) => (
            <input
              key={index}
              {...register(`features.${index}`)}
              placeholder={`Feature ${index + 1}`}
              className="w-full p-2 mb-2 rounded bg-gray-700"
            />
          ))}
        </div>

        <div>
          <label className="block font-bold mb-2 text-2xl">Packages</label>
          {watch("packages")?.map((pkg, index) => (
            <div key={index} className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>

              <input
                {...register(`packages.${index}.desc`)}
                placeholder={`${pkg.name} Description`}
                className="w-full p-2 mt-4 rounded bg-gray-700"
              />

              <div>
                <label className="block font-medium text-sm">
                  Delivery Time (days)
                </label>
                <input
                  {...register(`packages.${index}.deliveryTime`)}
                  type="number"
                  placeholder={`${pkg.name} Delivery Time`}
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>

              <div>
                <label className="block font-medium text-sm">Revisions</label>
                <input
                  {...register(`packages.${index}.revisionNumber`)}
                  type="number"
                  placeholder={`${pkg.name} Revisions`}
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>

              <div>
                <label className="block font-medium text-sm">Price</label>
                <input
                  {...register(`packages.${index}.price`)}
                  type="number"
                  placeholder={`${pkg.name} Price`}
                  className="w-full p-2 rounded bg-gray-700"
                />
              </div>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full p-2 bg-primaryRgb rounded text-white"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default EditService;
