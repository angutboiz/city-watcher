import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
const AuthLayout = () => {
    return (
        <>
            <Stack
                screenOptions={{
                    headerTintColor: '#fff',
                }}
            >
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="register"
                    options={{
                        headerShown: true,
                        title: 'Quên mật khẩu',
                    }}
                />
                <Stack.Screen name="forget" />
                <Stack.Screen
                    name="forget-type-email"
                    options={{
                        headerShown: true,
                        title: 'Quên mật khẩu',
                    }}
                />
                <Stack.Screen
                    name="send-forget-password-success"
                    options={{
                        headerShown: true,
                        title: 'Gửi email thành công',
                    }}
                />
                <Stack.Screen
                    name="change-password"
                    options={{
                        headerShown: true,
                        title: 'Thay đổi mật khẩu',
                    }}
                />
            </Stack>
            <Toast />
            {/* <Loader isLoading={loading} /> */}
            <StatusBar backgroundColor="#021432" style="light" />
        </>
    )
}

export default AuthLayout

const styles = StyleSheet.create({})
