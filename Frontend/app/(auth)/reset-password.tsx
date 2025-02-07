import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'


const ResetPasswordScreen = () => {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const handleResetPassword = () => {
        // Add your password reset logic here
        if (newPassword === confirmPassword) {
            // Handle password reset
        }
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={150}
            extraScrollHeight={100}
        >
            <SafeAreaView>
                <View className="px-6 py-10">

                    
                    <Text className="text-2xl font-semibold mb-2">
                        Quên mật khẩu
                    </Text>
                    <Text className="text-gray-500 mb-8">
                        Hãy ghi chú lại mật khẩu trước khi quên
                    </Text>
                    <View className=" mb-6">
                        <TextInput
                            className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-3"
                            placeholder="Nhập mật khẩu mới"
                            secureTextEntry
                            value={newPassword}
                            onChangeText={setNewPassword}
                        />
                        <TextInput
                            className="w-full border border-gray-300 rounded-lg px-4 py-3"
                            placeholder="Nhập lại mật khẩu mới"
                            secureTextEntry
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
                    </View>
                    <Pressable
                        className="bg-blue-500 py-4 rounded-lg"
                        onPress={handleResetPassword}
                    >
                        <Text className="text-white text-center font-semibold">
                            Thay đổi mật khẩu
                        </Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default ResetPasswordScreen

const styles = StyleSheet.create({})
