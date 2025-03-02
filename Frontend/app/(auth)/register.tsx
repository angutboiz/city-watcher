import { StyleSheet, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useForm } from 'react-hook-form'
import {
    ActivityIndicator,
    Button,
    Checkbox,
    Icon,
    MD2Colors,
    PaperProvider,
    Text,
    TextInput,
} from 'react-native-paper'
import { Controller } from 'react-hook-form'
import { Link, useRouter } from 'expo-router'
import axiosAPI from '@/services/axiosInstance'
import { Dropdown } from 'react-native-element-dropdown'
import { saveTokens } from '@/services/tokenStorage'
import { setUser } from '@/store/features/userSlice'
import { useDispatch } from 'react-redux'

const OPTIONS = [
    { label: 'Tân Uyên', value: 'Tân Uyên' },
    { label: 'Thuận An', value: 'Thuận An' },
    { label: 'Dĩ An', value: 'Dĩ An' },
    { label: 'Bến Cát', value: 'Bến Cát' },
    { label: 'Phú Giáo', value: 'Phú Giáo' },
    { label: 'Bầu Bàng', value: 'Bầu Bàng' },
    { label: 'Bắc Tân Uyên', value: 'Bắc Tân Uyên' },
    { label: 'Dầu Tiếng', value: 'Dầu Tiếng' },
    { label: 'Thủ Dầu Một', value: 'Thủ Dầu Một' },
]

const RegisterScreen = () => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            zone: 'Tân Uyên',
            password: '',
            confirmPassword: '',
            checked: false,
        },
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const password = watch('password')
    const dispatch = useDispatch()
    const onSubmit = async (data: any) => {
        console.log(data)
        try {
            setLoading(true)
            const response = await axiosAPI.post('/auth/register', data)
            if (response.data.ok) {
                ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                await saveTokens(
                    response.data?.data.accessToken,
                    response.data?.data.refreshToken
                )
                dispatch(setUser(response.data?.data.user))
                router.push({
                    pathname: '/otp',
                    params: { email: data.email },
                })
            }
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={150}
            extraScrollHeight={100}
            className="flex-1"
        >
            <SafeAreaView className="flex-1">
                <View className="px-6 py-10">
                    <Text className="text-2xl font-bold text-[#006ffd] mb-6">
                        Đăng ký tài khoản
                    </Text>

                    <View className="flex gap-3">
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
                            <Text style={{ color: '#ff0000' }}>
                                {errors.email.message as string}
                            </Text>
                        )}

                        {/* <Controller
                            control={control}
                            name="phoneNumber"
                            rules={{
                                required: 'Số điện thoại là bắt buộc',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Số điện thoại không hợp lệ',
                                },
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Số điện thoại"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!errors.phoneNumber}
                                    activeOutlineColor="#006ffd"
                                    placeholder="Nhập số điện thoại"
                                />
                            )}
                        />
                        {errors.phoneNumber && (
                            <Text style={{ color: '#ff0000' }}>
                                {errors.phoneNumber.message}
                            </Text>
                        )} */}

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
                                    secureTextEntry={!showPassword}
                                    right={
                                        <TextInput.Icon
                                            icon={
                                                showPassword ? 'eye-off' : 'eye'
                                            }
                                            onPress={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        />
                                    }
                                />
                            )}
                        />
                        {errors.password && (
                            <Text style={{ color: '#ff0000' }}>
                                {errors.password.message}
                            </Text>
                        )}

                        <Controller
                            control={control}
                            name="confirmPassword"
                            rules={{
                                required: 'Vui lòng xác nhận mật khẩu',
                                validate: (value) =>
                                    value === password || 'Mật khẩu không khớp',
                            }}
                            render={({ field: { onChange, value } }) => (
                                <TextInput
                                    label="Xác nhận mật khẩu"
                                    mode="outlined"
                                    value={value}
                                    onChangeText={onChange}
                                    error={!!errors.confirmPassword}
                                    activeOutlineColor="#006ffd"
                                    secureTextEntry={!showConfirmPassword}
                                    right={
                                        <TextInput.Icon
                                            icon={
                                                showConfirmPassword
                                                    ? 'eye-off'
                                                    : 'eye'
                                            }
                                            onPress={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        />
                                    }
                                />
                            )}
                        />
                        {errors.confirmPassword && (
                            <Text style={{ color: '#ff0000' }}>
                                {errors.confirmPassword.message}
                            </Text>
                        )}

                        <Controller
                            control={control}
                            name="zone"
                            rules={{
                                required:
                                    'Chọn vị trí là bắt buộc\n Vị trí này sẽ gửi đến quản lí khu vực mà bạn chọn',
                            }}
                            render={({ field: { onChange, value } }) => (
                                <Dropdown
                                    style={styles.dropdown}
                                    placeholderStyle={styles.placeholderStyle}
                                    selectedTextStyle={styles.selectedTextStyle}
                                    inputSearchStyle={styles.inputSearchStyle}
                                    iconStyle={styles.iconStyle}
                                    data={OPTIONS}
                                    search
                                    maxHeight={300}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Chọn huyện"
                                    searchPlaceholder="Tìm tên huyện tỉnh Bình Dương..."
                                    value={value}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors.zone && (
                            <Text style={{ color: '#ff0000' }}>
                                {errors.zone.message}
                            </Text>
                        )}

                        <Controller
                            control={control}
                            name="checked"
                            rules={{
                                required:
                                    'Vui lòng tick vào ô đồng ý với điều khoản và điều kiện',
                                validate: (value) =>
                                    value === true ||
                                    'Vui lòng đồng ý với điều khoản và điều kiện',
                            }}
                            render={({ field: { onChange, value } }) => (
                                <View className="flex items-center gap-1 flex-row">
                                    <Checkbox.Android
                                        status={value ? 'checked' : 'unchecked'}
                                        onPress={() => onChange(!value)}
                                    />
                                    <View className="flex items-center gap-1 flex-row">
                                        <Text>Đồng ý với</Text>
                                        <Text
                                            style={{
                                                color: '#006ffd',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Điều khoản
                                        </Text>
                                        <Text>và</Text>
                                        <Text
                                            style={{
                                                color: '#006ffd',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Dịch vụ
                                        </Text>
                                    </View>
                                </View>
                            )}
                        />
                        {errors.checked && (
                            <Text style={{ color: '#ff0000' }}>
                                {errors.checked.message}
                            </Text>
                        )}
                    </View>

                    <Button
                        mode="contained"
                        className="mt-10"
                        onPress={handleSubmit(onSubmit)}
                        loading={loading}
                        disabled={loading}
                        style={{ borderRadius: 10 }}
                        buttonColor="#006ffd"
                    >
                        Đăng ký
                    </Button>
                    <View className="mt-3 flex flex-row items-center justify-center gap-1">
                        <Text className="text-gray-500">
                            Bạn đã có tài khoản?
                        </Text>
                        <Link
                            href="/(auth)/login"
                            className="text-[#006ffd] font-bold"
                        >
                            Đăng nhập ngay
                        </Link>
                    </View>

                    <View className="w-full mt-10">
                        <View className="text-center">
                            <Text className="text-center mb-3 w-full">
                                Hoặc
                            </Text>
                        </View>
                        <View className="border border-gray-500 h-[45px] flex items-center justify-center flex-row gap-2 rounded-lg">
                            <Icon source="google" size={20} color="#62748e" />
                            <Text style={{ color: '#62748e' }}>
                                Đăng nhập với Google
                            </Text>
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default RegisterScreen
const styles = StyleSheet.create({
    dropdown: {
        margin: 0,
        padding: 15,
        borderRadius: 5,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})
