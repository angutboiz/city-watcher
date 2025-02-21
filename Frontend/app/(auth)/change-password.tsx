import { StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import axiosAPI from '@/services/axiosInstance'
import { useRouter } from 'expo-router'
import { useForm, Controller } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import { saveTokens } from '@/services/tokenStorage'
import { setUser } from '@/store/features/userSlice'
import { useDispatch } from 'react-redux'

const ChangePassword = () => {
    const [loading, setLoading] = useState(false)
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            old_password: '',
            new_password: '',
            re_new_password: '',
        },
    })
    const router = useRouter()
    const [show, setShow] = useState(false)
    const onSubmit = async (data: any) => {
        try {
            setLoading(true)
            const response = await axiosAPI.post('/auth/change-password', data)

            if (response.data.ok) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                await saveTokens(
                    response.data?.data.accessToken,
                    response.data?.data.refreshToken
                )
                router.push('/(tabs)/home')
            }
        } catch (error) {
            setLoading(false)
            ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT)
        }
    }
    const new_password = watch('new_password')

    return (
        <SafeAreaView>
            <View className="px-6 py-5">
                <View className="mb-6">
                    <Controller
                        control={control}
                        name="old_password"
                        rules={{
                            required: 'Mật khẩu cũ là bắt buộc',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu tối thiểu 6 ký tự',
                            },
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Nhập mật khẩu cũ"
                                mode="outlined"
                                value={value}
                                onChangeText={onChange}
                                error={!!errors.old_password}
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
                    {errors.old_password && (
                        <Text className="text-red-500">
                            {errors.old_password.message}
                        </Text>
                    )}
                </View>

                <Controller
                    control={control}
                    name="new_password"
                    rules={{
                        required: 'Mật khẩu mới là bắt buộc',
                        minLength: {
                            value: 6,
                            message: 'Mật khẩu tối thiểu 6 ký tự',
                        },
                    }}
                    render={({ field: { onChange, value } }) => (
                        <TextInput
                            label="Nhập mật khẩu mới"
                            mode="outlined"
                            value={value}
                            onChangeText={onChange}
                            error={!!errors.new_password}
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
                {errors.new_password && (
                    <Text className="text-red-500">
                        {errors.new_password.message}
                    </Text>
                )}

                <View className="mt-2">
                    <Controller
                        control={control}
                        name="re_new_password"
                        rules={{
                            required: 'Xác nhận mật khẩu mới là bắt buộc',
                            minLength: {
                                value: 6,
                                message: 'Mật khẩu tối thiểu 6 ký tự',
                            },
                            validate: (value) =>
                                value === new_password || 'Mật khẩu không khớp',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Xác nhận lại mật khẩu mới"
                                mode="outlined"
                                value={value}
                                onChangeText={onChange}
                                error={!!errors.re_new_password}
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
                    {errors.re_new_password && (
                        <Text className="text-red-500">
                            {errors.re_new_password.message}
                        </Text>
                    )}
                </View>

                <Button
                    onPress={handleSubmit(onSubmit)}
                    mode="contained"
                    style={{
                        borderRadius: 10,
                        marginTop: 20,
                        backgroundColor: '#006ffd',
                    }}
                >
                    Xác nhận thay đổi
                </Button>
            </View>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({})
