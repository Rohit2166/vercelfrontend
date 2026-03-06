// Unified API configuration for CRICBOX frontend
// This ensures consistent API URL across all pages

const getApiUrl = () => {
  // Check if we're running on localhost
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1');
  
  // Use local server for localhost development
  if (isLocalhost) {
    console.log("Using local server: http://localhost:5000");
    return "http://localhost:5000";
  }
  
  // Use deployed backend for production
  const DEPLOYED_BACKEND_URL = "https://backendvercel-puce.vercel.app";
  console.log("Using deployed backend:", DEPLOYED_BACKEND_URL);
  return DEPLOYED_BACKEND_URL;
};

export const API = getApiUrl();

export default API;
