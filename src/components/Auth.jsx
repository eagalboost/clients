import React from "react";
import Logo from "../assets/logo.png";
import element1 from "../assets/elements/element-1.png";
import element2 from "../assets/elements/element-2.png";
import InputField from "./InputField";

const Auth = ({
  mode,
  onSubmit,
  credentials,
  onChange,
  onFileChange,
  isLoading,
  error,
}) => {
  const isSignUp = mode === "sign-up";

  return (
    <div className="max-w-[1440px] my-auto mt-4 mx-auto mb-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row w-full lg:w-[90%] px-8 py-8 rounded-xl justify-between items-center mx-auto bg-[#222222] gap-6 lg:gap-0">
        <div className="w-full lg:w-[400px]">
          <div className="flex flex-col gap-6">
            <div className="text-primaryText flex flex-col gap-5">
              <div className="flex justify-center lg:justify-start">
                <img
                  src={Logo}
                  alt="Eagle Boost logo"
                  className="max-w-[150px]"
                />
              </div>
              <div>
                <h3 className="text-2xl font-openSans font-medium text-center lg:text-left">
                  {isSignUp ? "Get Started" : "Welcome Back"}
                </h3>
                <p className="font-openSans text-base text-[#777777] text-center lg:text-left">
                  {isSignUp
                    ? "Welcome to Eagle Boost - Let's create your account"
                    : "Let's sign in to your account"}
                </p>
              </div>
            </div>
            <form className="flex flex-col gap-3" onSubmit={onSubmit}>
              <InputField
                label="Username"
                id="username"
                type="text"
                name="username"
                value={credentials.username}
                onChange={onChange}
                required
              />
              <InputField
                label="Password"
                id="password"
                type="password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
              />
              {isSignUp && (
                <>
                  <InputField
                    label="Email"
                    id="email"
                    type="email"
                    name="email"
                    value={credentials.email}
                    onChange={onChange}
                    required
                  />
                  <InputField
                    label="Country"
                    id="country"
                    type="text"
                    name="country"
                    value={credentials.country}
                    onChange={onChange}
                    required
                  />
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="profilePicture"
                      className="text-primaryText font-openSans font-semibold"
                    >
                      Upload Your Image (Optional)
                    </label>
                    <input
                      className="bg-inherit border border-colorNeonPink focus:outline-none focus:shadow-focusNeonPink px-2 py-2 rounded-md text-primaryText"
                      id="profilePicture"
                      type="file"
                      name="profilePicture"
                      accept="image/*"
                      onChange={onFileChange}
                    />
                  </div>
                </>
              )}
              <div>
                <button
                  className="text-black button-gradient w-full px-2 py-2 rounded-md font-openSans font-semibold"
                  disabled={isLoading} 
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </form>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
        </div>
        <div className="bg-[url('/auth-bg.png')] auth-bg w-full h-[500px] lg:w-[600px] lg:h-[650px] rounded-xl relative bg-cover bg-top">
          <h1 className="text-3xl sm:text-5xl absolute top-10 left-4 sm:left-10 font-roboto italic text-primaryText">
            Embrace <br /> the Next Wave
          </h1>
          <h1 className="absolute top-36 sm:top-40 left-10 sm:left-32 text-3xl sm:text-5xl font-roboto italic text-primaryText">
            of Digital <br /> Transformation
          </h1>
          <div className="absolute bottom-4 left-2 bg-white/20 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-3 sm:p-6">
            <img
              src={element1}
              className="w-[80px] lg:w-[150px]"
              alt="Decorative element 1"
              loading="lazy"
            />
          </div>
          <div className="absolute bottom-20 right-3 bg-white/20 backdrop-blur-md border border-white/10 shadow-lg rounded-xl p-3 sm:p-6">
            <img
              src={element2}
              className="w-[150px] lg:w-[300px]"
              alt="Decorative element 2"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
