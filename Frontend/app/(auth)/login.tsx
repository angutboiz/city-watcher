import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    ToastAndroid,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import {
    Button,
    Icon,
    TextInput,
    Snackbar,
    Portal,
    Dialog,
    Paragraph,
    ActivityIndicator,
    MD2Colors,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { loginService } from '@/services/authService'
import axiosAPI from '@/services/axiosInstance'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import { saveTokens } from '@/services/tokenStorage'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUser } from '@/store/features/userSlice'
import { useDispatch } from 'react-redux'
import { useAuth } from '@/hooks/useAuth'
import { useForm, Controller } from 'react-hook-form'
import { FormBuilder } from 'react-native-paper-form-builder'

const LoginScreen = () => {
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    })
    const [visible, setVisible] = useState(false)

    const hideDialog = () => setVisible(false)
    const [show, setShow] = useState(false)
    const router = useRouter()
    const dispatch = useDispatch()
    const { isAuthenticated } = useAuth()
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            const response = await axiosAPI.post('/auth/login', data)

            if (response.data.ok) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                await saveTokens(
                    response.data?.data.accessToken,
                    response.data?.data.refreshToken
                )
                dispatch(setUser(response.data?.data.user))
                router.push('/(tabs)/home')
            }
        } catch (error) {
            setLoading(false)
            ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT)
        }
    }

    // const checkSkipWelcome = async () => {
    //     const checkSkipWelcome = await AsyncStorage.getItem('skipWelcome')
    //     if (checkSkipWelcome) {
    //         router.push('/(auth)/login')
    //     }
    // }

    useEffect(() => {
        // checkSkipWelcome()
        // if (isAuthenticated) {
        //     router.push('/(tabs)/home')
        // }
    }, [])

    const handleForgetPassword = (email: string) => {
        // if (email) {
        //     router.push({
        //         pathname: '/(auth)/forget',
        //         params: { email: email },
        //     })
        // } else {
        // }
        router.push('/(auth)/forget-type-email')
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={150}
            extraScrollHeight={100}
            className="flex-1"
        >
            <SafeAreaView className=" flex-1">
                <Image
                    style={styles.logo}
                    className="rounded-b-3xl"
                    source={require('@/app/assets/images/smart-city.jpg')}
                ></Image>
                <View className="px-6 py-10 flex-1">
                    <Text className="text-2xl font-bold text-[#006ffd]">
                        Xin chào Bình Dương!
                    </Text>

                    <View className="flex gap-3 mt-5">
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
                                <TextInput
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

                        <Controller
                            control={control}
                            name="password"
                            rules={{
                                required: 'Mật khẩu là bắt buộc',
                                minLength: {
                                    value: 6,
                                    message: 'Mật khẩu tối thiểu 6 ký tự',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Mật khẩu"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!errors.password}
                                    activeOutlineColor="#006ffd"
                                    placeholder="Nhập mật khẩu"
                                    secureTextEntry={!show}
                                    right={
                                        <TextInput.Icon
                                            onPress={() => setShow(!show)}
                                            icon={show ? 'eye-off' : 'eye'}
                                        />
                                    }
                                />
                            )}
                        />
                        {errors.password && (
                            <Text className="text-red-500">
                                {errors.password.message}
                            </Text>
                        )}

                        <Button
                            onPress={() => handleForgetPassword(watch('email'))}
                            mode="text"
                            style={{
                                marginLeft: 'auto',
                                padding: 0,
                            }}
                        >
                            Quên mật khẩu?
                        </Button>
                    </View>
                    <View className="mt-6">
                        <Button
                            mode="contained"
                            style={{ borderRadius: 10 }}
                            buttonColor="#006ffd"
                            onPress={handleSubmit(onSubmit)}
                            loading={loading}
                            disabled={loading}
                        >
                            Đăng nhập
                        </Button>
                        <View className="mt-2 flex flex-row items-center justify-center gap-1">
                            <Text>Bạn chưa có tài khoản?</Text>
                            <Link
                                href="/(auth)/register"
                                className="text-[#006ffd] font-bold"
                            >
                                Đăng ký ngay
                            </Link>
                        </View>
                    </View>
                    <View className="w-full h-[1px] bg-gray-200 my-5"></View>
                    <View>
                        <Text className="text-center mb-3">Hoặc</Text>
                        <View className="border border-gray-500 h-[45px] flex items-center justify-center flex-row gap-2 rounded-lg">
                            <Icon source="google" size={20} color="#62748e" />
                            <Text className="text-[#62748e] ">
                                Đăng nhập với Google
                            </Text>
                        </View>
                    </View>
                </View>
                <Portal>
                    <Dialog visible={visible} onDismiss={hideDialog}>
                        <Dialog.Title>This is a title</Dialog.Title>
                        <Dialog.Content>
                            <Paragraph>This is simple dialog</Paragraph>
                        </Dialog.Content>
                    </Dialog>
                </Portal>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default LoginScreen

const styles = StyleSheet.create({
    logo: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
    },
    btn: {
        width: '100%',
        height: 40,
        borderRadius: '10%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
