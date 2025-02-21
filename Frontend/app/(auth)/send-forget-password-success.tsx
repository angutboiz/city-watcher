import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { useLocalSearchParams, useRouter } from 'expo-router'

const SendForgetPasswordSuccess = () => {
    const { email } = useLocalSearchParams<{ email: string }>()

    const router = useRouter()
    const handleNavHome = () => {
        router.push('/(auth)/login')
    }

    return (
        <SafeAreaView>
            <View className="px-6 py-10">
                <View className="mb-3">
                    <Text className="texxt-center text-2xl font-bold">
                        Gửi email thành công tới
                    </Text>
                    <Text className="text-blue-500 font-bold ">{email}</Text>
                </View>
                <Text className="text-gray-500">
                    Vui lòng kiểm tra trong tin nhắn hoặc spam trong Gmail
                </Text>

                <Button
                    mode="contained"
                    onPress={handleNavHome}
                    style={{
                        borderRadius: 10,
                        marginTop: 50,
                        backgroundColor: '#006ffd',
                    }}
                >
                    Quay về trang chủ
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default SendForgetPasswordSuccess

const styles = StyleSheet.create({})
