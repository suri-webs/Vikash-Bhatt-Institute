import { getServerUrl } from "@/components/utils/config";
import axios from "axios";

const api = axios.create({
    baseURL: getServerUrl(),
    withCredentials: true,
});

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post("/refresh");
                return api(originalRequest);

            } catch (refreshError) {
                // Agar /results request hai toh login par redirect mat karo
                // UI mein error show hoga
                const isResultsRequest = originalRequest.url?.includes("/results");

                if (!isResultsRequest) {
                    await api.post("/logout");
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;