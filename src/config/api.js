// API configuration for CRICBOX frontend
// Automatically detect if running locally or in production

// Check if we're in development mode (localhost)
const isLocalhost = window && window.location && window.location.hostname === 'localhost';

// Use localhost for local development, Vercel URL for production
export const API = isLocalhost ? "http://localhost:5000" : "https://backendvercel-puce.vercel.app";

console.log("Running in:", isLocalhost ? "development" : "production");
console.log("API URL:", API);

export default API;

