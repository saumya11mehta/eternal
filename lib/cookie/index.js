import {serialize} from "cookie";

export const getAuthCookie = (authToken) => {
    let cookie = serialize('auth_token', authToken, {
        httpOnly: false, // Prevent client-side JavaScript access
        secure: process.env.NODE_ENV === "production", // Set secure flag in production
        maxAge: 60 * 60 * 24 * 7, // One week
        path: '/',
    });
    return cookie;
}