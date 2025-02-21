import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { getTokens, saveTokens, removeTokens } from './tokenStorage'
import Toast from 'react-native-toast-message'
import { ToastAndroid } from 'react-native'
const axiosAPI = axios.create({
    // baseURL: 'http://10.0.2.2:5000/api/v1',
    baseURL: 'http://172.23.242.212:5000/api/v1',
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

// axiosAPI.interceptors.response.use(
//     (response) => response,
//     async (error: AxiosError) => {
//         const originalRequest = error.config as InternalAxiosRequestConfig & {
//             _retry?: boolean
//         }
//         if (error.response?.status === 401 && !originalRequest._retry) {
//             if (isRefreshing) {
//                 return new Promise<string>((resolve, reject) => {
//                     failedQueue.push({ resolve, reject })
//                 })
//                     .then((token) => {
//                         originalRequest.headers.Authorization = `Bearer ${token}`
//                         return axiosAPI(originalRequest)
//                     })
//                     .catch((err) => Promise.reject(err))
//             }

//             originalRequest._retry = true
//             isRefreshing = true

//             try {
//                 const tokens = await getTokens()
//                 const { data } = await axios.post<{
//                     access_token: string
//                     refresh_token: string
//                 }>('http://10.0.2.2:5000/api/v1/auth/refresh-token', {
//                     refresh_token: tokens?.refreshToken,
//                 })

//                 await saveTokens(data.access_token, data.refresh_token)
//                 axiosAPI.defaults.headers.common.Authorization = `Bearer ${data.access_token}`
//                 processQueue(null, data.access_token)

//                 return axiosAPI(originalRequest)
//             } catch (err) {
//                 processQueue(err as AxiosError, null)
//                 await removeTokens()
//                 return Promise.reject(err)
//             } finally {
//                 isRefreshing = false
//             }
//         }

//         return Promise.reject(error)
//     }
// )
axiosAPI.interceptors.response.use(
    (response) => response, // Trả về response nếu thành công
    (error) => {
        if (error.response) {
            const { status, data } = error.response
            // console.error('📌 API Error:', status, data)

            // Hiển thị Alert hoặc Toast khi gặp lỗi
            ToastAndroid.show(data.message, ToastAndroid.SHORT)
        } else if (error.request) {
            // console.error('📌 No Response from Server:', error.request)

            ToastAndroid.show(
                error.message ||
                    'Không thể kết nối đến server, vui lòng kiểm tra mạng!',
                ToastAndroid.SHORT
            )
        } else {
            // console.error('📌 Request Error:', error.message)
            ToastAndroid.show(error.message, ToastAndroid.SHORT)
        }

        return Promise.reject(error)
    }
)

export default axiosAPI
