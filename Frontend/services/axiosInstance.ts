import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getTokens, saveTokens, removeTokens } from './tokenStorage'
import { ToastAndroid } from 'react-native'
const axiosAPI = axios.create({
    // baseURL: 'http://10.0.2.2:5000/api/v1',
    baseURL: 'https://city-watcher.vercel.app/api/v1',
})

let isRefreshing = false
let failedQueue: Array<{
    resolve: (token: string) => void
    reject: (error: AxiosError) => void
}> = []

const processQueue = (error: AxiosError | null, token: string | null) => {
    failedQueue.forEach((prom) => {
        if (token) {
            prom.resolve(token)
        } else {
            prom.reject(error!)
        }
    })
    failedQueue = []
}

axiosAPI.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
        const tokens = await getTokens()
        if (tokens?.accessToken) {
            config.headers.Authorization = `Bearer ${tokens.accessToken}`
        }
        return config
    },
    (error) => Promise.reject(error)
)

axiosAPI.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
            _retry?: boolean
            data?: any // Thêm type cho data
        }

        // Kiểm tra lỗi 401 và chưa retry
        if (error.response?.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                try {
                    const token = await new Promise<string>(
                        (resolve, reject) => {
                            failedQueue.push({ resolve, reject })
                        }
                    )

                    // Cập nhật lại token cho request
                    originalRequest.headers.Authorization = `Bearer ${token}`
                    // Đảm bảo giữ nguyên data của request gốc
                    return axiosAPI({
                        ...originalRequest,
                        data: JSON.parse(originalRequest.data || '{}'),
                    })
                } catch (err) {
                    return Promise.reject(err)
                }
            }

            originalRequest._retry = true
            isRefreshing = true

            try {
                const tokens = await getTokens()
                const { data } = await axios.post(
                    'https://city-watcher.vercel.app/api/v1/auth/refresh-token',
                    { refreshToken: tokens?.refreshToken }
                )

                await saveTokens(data.accessToken, data.refreshToken)
                axiosAPI.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`

                // Xử lý queue và cập nhật token
                processQueue(null, data.accessToken)

                // Gửi lại request gốc với token mới và data gốc
                return axiosAPI({
                    ...originalRequest,
                    headers: {
                        ...originalRequest.headers,
                        Authorization: `Bearer ${data.accessToken}`,
                    },
                    data: JSON.parse(originalRequest.data || '{}'),
                })
            } catch (err) {
                processQueue(err as AxiosError, null)
                await removeTokens()
                return Promise.reject(err)
            } finally {
                isRefreshing = false
            }
        }

        // Xử lý các lỗi khác
        if (error.response) {
            const { data } = error.response
            ToastAndroid.show(
                data?.message || 'Có lỗi xảy ra',
                ToastAndroid.SHORT
            )
        } else if (error.request) {
            ToastAndroid.show(
                'Không thể kết nối đến server, vui lòng kiểm tra mạng!',
                ToastAndroid.SHORT
            )
        } else {
            ToastAndroid.show(
                error.message || 'Có lỗi xảy ra',
                ToastAndroid.SHORT
            )
        }

        return Promise.reject(error)
    }
)

export default axiosAPI
