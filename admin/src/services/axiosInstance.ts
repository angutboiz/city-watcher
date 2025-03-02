import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const axiosAPI = axios.create({
    baseURL: "http://localhost:5000/api/v1",
});

let isRefreshing = false;
let failedQueue: Array<{
    resolve: (token: string) => void;
    reject: (error: AxiosError) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token);
        } else {
            prom.reject(error!);
        }
    });
    failedQueue = [];
};

const accessToken = Cookies.get("accessToken");
const refreshToken = Cookies.get("refreshToken");

axiosAPI.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        config.headers.Authorization = `Bearer ${accessToken}`;
        return config;
    },
    (error) => Promise.reject(error)
);

axiosAPI.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean;
            data?: any; // Thêm type cho data
        };

        // Kiểm tra lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                const token = await new Promise<string>((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                });

                // Cập nhật lại token cho request
                originalRequest.headers.Authorization = `Bearer ${token}`;
                // Đảm bảo giữ nguyên data của request gốc
                return axiosAPI({
                    ...originalRequest,
                    data: JSON.parse(originalRequest.data || "{}"),
                });
                // try {
                // } catch (err) {
                //     // return Promise.reject(err);
                // }
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const { data } = await axios.post("http://localhost:5000/api/v1/auth/refresh-token", { refreshToken });
                Cookies.set("accessToken", data.data, { expires: 1 / 24 });
                axiosAPI.defaults.headers.common.Authorization = `Bearer ${data.data}`;

                // Xử lý queue và cập nhật token
                processQueue(null, data.data);

                // Gửi lại request gốc với token mới và data gốc
                return axiosAPI({
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${data.data}`,
                    },
                    data: JSON.parse(originalRequest.data || "{}"),
                });
            } catch (err) {
                processQueue(err as AxiosError, null);

                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        // Xử lý các lỗi khác
        if (error.response) {
            const { data } = error.response as { data: { message?: string } };
            toast.error(data.message || "Có lỗi xảy ra, vui lòng thử lại sau!");
        } else if (error.request) {
            toast.error("Không thể kết nối đến server, vui lòng kiểm tra mạng!");
        } else {
            toast.error("Có lỗi xảy ra, vui lòng thử lại sau!");
        }

        return Promise.reject({
            handled: true,
            error: error,
            data: error.response?.data,
        });
    }
);

export default axiosAPI;
