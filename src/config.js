// src/api.js (or src/config.js)

// Use env variable if available, otherwise fallback to Render backend.
// Ensure no trailing slash at the end of the URL.
const API_BASE = (
  import.meta.env.VITE_API_URL || "https://the-moon-cafe.onrender.com"
).replace(/\/+$/, "");

console.log("✅ API Base URL:", API_BASE);
console.log("Henil");

export default API_BASE;