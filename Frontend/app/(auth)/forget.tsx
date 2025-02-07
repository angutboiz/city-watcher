import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router' // Thêm useRouter
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgetScreen = () => {
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const inputRefs = Array(6)
        .fill(0)
        .map(() => React.createRef<TextInput>())
    
    const router = useRouter() // Khởi tạo router

    const handleCodeChange = (text: string, index: number) => {
        if (text.length <= 1) {
            const newCode = [...code]
            newCode[index] = text
            setCode(newCode)

            if (text.length === 1 && index < 5) {
                inputRefs[index + 1].current?.focus()
            }
        }
    }

    const handleKeyPress = (e: any, index: number) => {
        if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputRefs[index - 1].current?.focus()
        }
    }

    const handleContinue = () => {
        if (code.every((digit) => digit)) {
            router.push('/reset-password') // Chuyển đến trang đặt lại mật khẩu
        }
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={150}
            extraScrollHeight={100}
        >
            <SafeAreaView>
                <View className="px-6 py-10 flex items-center justify-center">
                    <View>
                        <Text className="text-2xl font-semibold mb-2 text-center">
                            Quên mật khẩu
                        </Text>
                        <Text className="text-gray-500 mb-8 text-center">
                            Một mã 6 chữ số đã được gửi đến email
                            lucasscott13@gmail.com
                        </Text>

                        {/* Ô nhập mã xác nhận */}
                        <View className="flex-row justify-between mb-4">
                            {code.map((digit, index) => (
                                <TextInput
                                    key={index}
                                    ref={inputRefs[index]}
                                    className={`w-12 h-12 border rounded-lg text-center text-lg
                                    ${
                                        digit
                                            ? 'border-blue-500'
                                            : 'border-gray-300'
                                    }`}
                                    maxLength={1}
                                    keyboardType="number-pad"
                                    value={digit}
                                    onChangeText={(text) =>
                                        handleCodeChange(text, index)
                                    }
                                    onKeyPress={(e) => handleKeyPress(e, index)}
                                />
                            ))}
                        </View>

                        {/* Gửi lại mã */}
                        <Pressable className="mb-6">
                            <Text className="text-blue-500 text-center">
                                Gửi lại mã
                            </Text>
                        </Pressable>

                        {/* Nút tiếp tục */}
                        <Pressable
                            className="bg-blue-500 py-4 rounded-lg"
                            disabled={code.some((digit) => !digit)}
                            onPress={handleContinue} // Gọi hàm điều hướng
                        >
                            <Text className="text-white text-center font-semibold">
                                Tiếp tục
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default ForgetScreen
