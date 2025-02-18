import AsyncStorage from '@react-native-async-storage/async-storage'

interface Tokens {
    accessToken: string
    refreshToken: string
}

export const saveTokens = async (
    accessToken: string,
    refreshToken: string
): Promise<void> => {
    try {
        await AsyncStorage.setItem('accessToken', accessToken)
        await AsyncStorage.setItem('refreshToken', refreshToken)
    } catch (error) {
        console.error('Lỗi khi lưu token:', error)
    }
}

export const getTokens = async (): Promise<Tokens | null> => {
    try {
        const data = await AsyncStorage.getItem('accessToken')
        return data ? { accessToken: data, refreshToken: '' } : null
    } catch (error) {
        console.error('Lỗi khi lấy token:', error)
        return null
    }
}

export const removeTokens = async (): Promise<void> => {
    try {
        await AsyncStorage.removeItem('accessToken')
        await AsyncStorage.removeItem('refreshToken')
    } catch (error) {
        console.error('Lỗi khi xóa token:', error)
    }
}
