// lib/api.ts
import { getServerUrl } from "@/components/utils/config";
import axios from "axios";

const api = axios.create({
    baseURL: getServerUrl(),
    withCredentials: true, // ✅ sends cookies automatically
    
});

// ✅ Intercept every response
api.interceptors.response.use(
    (response) => response, // ✅ success → return normally

    async (error) => {
        const originalRequest = error.config;

        // ✅ accessToken expired + not already retried
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // prevent infinite loop

            try {
                // ✅ call refresh → browser sends refreshToken cookie automatically
                await api.post("/refresh");

                // ✅ retry original request with new accessToken
                return api(originalRequest);

            } catch (refreshError) {
                // ✅ refreshToken expired → logout
                await api.post("/logout");
                window.location.href = "/login";
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;