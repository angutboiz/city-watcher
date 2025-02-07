import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native'
import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

const RegisterScreen = () => {
    const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', ''])
    const [countdown, setCountdown] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const inputRefs = useRef<TextInput[]>([])

    const handleCodeChange = (text: string, index: number) => {
        if (text.length <= 1) {
            const newCode = [...verificationCode]
            newCode[index] = text
            setVerificationCode(newCode)
            
            // Move to next input if there's a value
            if (text.length === 1 && index < 5) {
                inputRefs.current[index + 1]?.focus()
            }
        }
    }

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => {
                setCountdown(countdown - 1)
            }, 1000)
            return () => clearTimeout(timer)
        }
    }, [countdown])

    const resendCode = () => {
        // Only allow resend if countdown is 0
        if (countdown === 0) {
            // Handle resend code logic
            console.log('Resending code...')
            setShowSuccess(true)
            setCountdown(60)
            
            // Hide success message after 3 seconds
            setTimeout(() => {
                setShowSuccess(false)
            }, 3000)
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
                    <Text className="text-xl font-semibold mb-2">Nhập mã xác nhận</Text>
                    <Text className="text-gray-500 mb-6">
                        Một mã 6 chữ số đã được gửi đến email lucasscott13@gmail.com
                    </Text>

                    {/* Verification code input boxes */}
                    <View className="flex-row justify-between mb-6">
                        {verificationCode.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={ref => inputRefs.current[index] = ref as TextInput}
                                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg"
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(text) => handleCodeChange(text, index)}
                            />
                        ))}
                    </View>

                    {/* Success message */}
                    {showSuccess && (
                        <Text className="text-green-500 text-center mb-2">
                            Mã đã được gửi thành công
                        </Text>
                    )}

                    {/* Resend code button */}
                    <Pressable 
                        onPress={resendCode}
                        disabled={countdown > 0}
                    >
                        <Text className={`text-center mb-6 ${countdown > 0 ? 'text-gray-400' : 'text-blue-500'}`}>
                            {countdown > 0 ? `Gửi lại mã (${countdown}s)` : 'Gửi lại mã'}
                        </Text>
                    </Pressable>

                    {/* Continue button */}
                    <Pressable 
                        className="bg-blue-500 rounded-lg py-4 mb-4"
                        onPress={() => console.log('Continue pressed')}
                    >
                        <Text className="text-white text-center font-semibold">
                            Tiếp tục
                        </Text>
                    </Pressable>

                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({})
