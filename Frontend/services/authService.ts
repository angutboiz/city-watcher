import axiosAPI from './axiosInstance'
import { saveTokens, removeTokens } from './tokenStorage'

export const loginService = async (
    email: string,
    password: string
): Promise<boolean> => {
    try {
        const { data } = await axiosAPI.post<{
            access_token: string
            refresh_token: string
        }>('/auth/login', { email, password })
        await saveTokens(data.access_token, data.refresh_token)
        return true
    } catch (error) {
        console.error('Lỗi đăng nhập:', error)
        return false
    }
}

export const logoutService = async (): Promise<void> => {
    try {
        await axiosAPI.post('/auth/logout')
    } catch (error) {
        console.error('Lỗi khi đăng xuất:', error)
    } finally {
        await removeTokens()
    }
}
