import { getServerUrl } from "@/components/utils/config";
import axios from "axios";

const api = axios.create({
    baseURL: getServerUrl(),
    withCredentials: true,
});

const NO_RETRY_URLS = ["/refresh", "/logout", "/login"];

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        const isAuthRoute = NO_RETRY_URLS.some(url =>
            originalRequest.url?.includes(url)
        );
        if (isAuthRoute) {
            return Promise.reject(error);
        }

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                await api.post("/refresh");
                return api(originalRequest);

            } catch (refreshError) {
                const isResultsRequest = originalRequest.url?.includes("/results");

                if (!isResultsRequest) {
                  
                    await axios.post(`${getServerUrl()}/logout`, {}, { withCredentials: true });
                    window.location.href = "/login";
                }

                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;