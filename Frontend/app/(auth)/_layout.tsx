import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
const AuthLayout = () => {
    return (
        <>
            <Stack>
                <Stack.Screen
                    name="login"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="register"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="forget"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="forget-type-email"
                    options={{
                        headerShown: false,
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
