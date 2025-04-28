/**
 * An array of routes that are used for authentication
 * These routes will redirect logged in users to /settings
 * @type { string[] }
 */
export const authRoutes = ["/login", "/register"];

/**
 * The prefix for API authentication routes
 * @type { string }
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect route for logged in users
 * @type { string }
 */
export const DEFAULT_LOGIN_REDIRECT = "/upload";
