// API configuration for CRICBOX frontend

const getApiUrl = () => {

  // 1️⃣ If environment variable is set (recommended for production)
  if (import.meta.env.VITE_API_URL) {
    console.log("Using ENV API:", import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }

  // 2️⃣ Local development
  if (typeof window !== "undefined" &&
      (window.location.hostname === "localhost" ||
       window.location.hostname === "127.0.0.1")) {

    console.log("Using Local API: http://localhost:5000");
    return "http://localhost:5000";
  }

  // 3️⃣ Production fallback (your backend URL)
  const productionAPI = "https://backendvercel-nh0ww5yun-rohit2166s-projects.vercel.app";

  console.log("Using Production API:", productionAPI);

  return productionAPI;
};

export const API = getApiUrl();

export default API;