// Unified API configuration for CRICBOX frontend
// This ensures consistent API URL across all pages

const getApiUrl = () => {
  // Use the deployed Vercel backend URL for production
  const DEPLOYED_BACKEND_URL = "https://backendvercel-puce.vercel.app";
  
  // Check if VITE_API_URL is explicitly set - use this for both local and production
  if (import.meta.env.VITE_API_URL) {
    console.log("Using VITE_API_URL:", import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Check if we're in development mode (localhost)
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || 
     window.location.hostname === '127.0.0.1' ||
     window.location.hostname.startsWith('192.168.') ||
     window.location.hostname.startsWith('10.'));
  
  // For localhost, default to local server
  if (isLocalhost) {
    console.log("Using local server: http://localhost:5000");
    return "http://localhost:5000";
  }
  
  // For production, use the deployed backend URL
  console.log("Using deployed backend:", DEPLOYED_BACKEND_URL);
  return DEPLOYED_BACKEND_URL;
};

export const API = getApiUrl();

export default API;
