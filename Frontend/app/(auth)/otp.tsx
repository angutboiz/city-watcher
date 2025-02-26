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
import { useForm } from 'react-hook-form'
import axiosAPI from '@/services/axiosInstance'
import { PaperOtpInput } from 'react-native-paper-otp-input'
import { Button } from 'react-native-paper'

const OTPScreen = () => {
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
    const router = useRouter()
    const handleCodeChange = async (pin: string, index: number) => {
        try {
            setLoading(true)
            if (pin.length === 6) {
                const { data } = await axiosAPI.post('/auth/check-otp', {
                    otp: pin,
                })
                if (data.ok) {
                    setLoading(false)
                    router.push('/(tabs)/home')
                    ToastAndroid.show(data.message, ToastAndroid.SHORT)
                } else {
                    ToastAndroid.show(data.message, ToastAndroid.SHORT)
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const handleSendOTP = async () => {
        console.log('Press ')
    }

    return (
        <SafeAreaView className="px-6">
            <Text className="text-xl font-semibold mb-3">Nhập mã xác nhận</Text>
            <View className="mb-5">
                <Text className="text-gray-500">
                    Một mã 6 chữ số đã được gửi đến:
                </Text>
                <Text className="text-blue-500 font-bold mb-6">{email}</Text>
            </View>
            <View className="mb-5">
                <PaperOtpInput
                    autoFocus
                    maxLength={6}
                    otpBorderFocusedColor="#006ffd"
                    onPinChange={(pin) => handleCodeChange(pin, 0)}
                />
            </View>
            {showSuccess && (
                <Text className="text-green-500 text-center my-3">
                    Mã đã được gửi thành công
                </Text>
            )}
            <Pressable onPress={resendCode} disabled={countdown > 0}>
                <Text
                    className={`text-center mb-6 ${
                        countdown > 0 ? 'text-gray-400' : 'text-blue-500'
                    }`}
                >
                    {countdown > 0
                        ? `Gửi lại mã sau (${countdown}s)`
                        : 'Gửi lại mã'}
                </Text>
            </Pressable>

            <Button
                mode="contained"
                style={{ borderRadius: 10 }}
                buttonColor="#006ffd"
                onPress={handleSendOTP}
                loading={loading}
                disabled={loading}
            >
                Tiếp tục
            </Button>
        </SafeAreaView>
    )
}

export default OTPScreen
