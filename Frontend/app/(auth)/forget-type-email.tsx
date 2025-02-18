import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Pressable,
    ToastAndroid,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocalSearchParams, useRouter } from 'expo-router' // Thêm useRouter
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { Button, TextInput as TextInputPaper } from 'react-native-paper'
import axiosAPI from '@/services/axiosInstance'
const ForgetScreen = () => {
    const [verificationCode, setVerificationCode] = useState([
        '',
        '',
        '',
        '',
        '',
        '',
    ])
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            email: '',
        },
    })
    const [countdown, setCountdown] = useState(0)
    const [showSuccess, setShowSuccess] = useState(false)
    const inputRefs = useRef<TextInput[]>([])
    const { email } = useLocalSearchParams<{ email: string }>()
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

    const [loading, setLoading] = useState(false)
    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            const response = await axiosAPI.post('/auth/login', data)

            if (response.data.ok) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
            }
        } catch (error) {
            ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT)
        } finally {
            setLoading(false)
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
                    <View>
                        <Text className="text-xl font-semibold mb-1">
                            Nhập email
                        </Text>
                        <Controller
                            control={control}
                            name="email"
                            rules={{
                                required: 'Email là bắt buộc',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Email không hợp lệ',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInputPaper
                                    label="Email"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!errors.email}
                                    activeOutlineColor="#006ffd"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                />
                            )}
                        />
                        {errors.email && (
                            <Text className="text-red-500">
                                {errors.email.message}
                            </Text>
                        )}
                        <Button
                            mode="contained"
                            style={{ borderRadius: 10, marginTop: 10 }}
                            buttonColor="#006ffd"
                            onPress={handleSubmit(onSubmit)}
                        >
                            Gửi mail
                        </Button>
                    </View>
                    <Text className="text-xl font-semibold mb-3">
                        Nhập mã xác nhận
                    </Text>
                    {email && (
                        <View>
                            <Text className="text-gray-500">
                                Một mã 6 chữ số đã được gửi đến email
                            </Text>
                            <Text className="text-gray-500 mb-6">{email}</Text>
                        </View>
                    )}

                    {/* Verification code input boxes */}
                    <View className="flex-row justify-between mb-6">
                        {verificationCode.map((digit, index) => (
                            <TextInput
                                key={index}
                                ref={(ref) =>
                                    (inputRefs.current[index] =
                                        ref as TextInput)
                                }
                                className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg"
                                keyboardType="number-pad"
                                maxLength={1}
                                value={digit}
                                onChangeText={(text) =>
                                    handleCodeChange(text, index)
                                }
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
                    <Pressable onPress={resendCode} disabled={countdown > 0}>
                        <Text
                            className={`text-center mb-6 ${
                                countdown > 0
                                    ? 'text-gray-400'
                                    : 'text-blue-500'
                            }`}
                        >
                            {countdown > 0
                                ? `Gửi lại mã (${countdown}s)`
                                : 'Gửi mã'}
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

export default ForgetScreen
