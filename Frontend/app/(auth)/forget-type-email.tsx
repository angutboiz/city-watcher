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
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data: any) => {
        console.log(data)
        try {
            setLoading(true)
            const response = await axiosAPI.post('/auth/forget', {
                email: data.email,
            })

            if (response.data.ok) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                router.push({
                    pathname: '/(auth)/send-forget-password-success',
                    params: { email: data.email },
                })
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
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default ForgetScreen
