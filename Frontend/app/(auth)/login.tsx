import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
} from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const LoginScreen = () => {
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const router = useRouter()
    const handleLogin = () => {
        console.log('Login')
        router.push('/(tabs)/home')
    }
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={150}
            extraScrollHeight={100}
        >
            <SafeAreaView>
                <Image
                    style={styles.logo}
                    className=""
                    source={require('../../assets/images/smart-city.jpg')}
                ></Image>
                <View className="px-6 py-10">
                    <Text className="text-2xl font-bold text-[#006ffd]">
                        Xin chào Bình Dương!
                    </Text>
                    <View className="flex gap-3 mt-5">
                        <TextInput
                            label="Email"
                            activeOutlineColor="#006ffd"
                            mode="outlined"
                            placeholder="Nhập số điện thoại"
                            value={text}
                            onChangeText={(text) => setText(text)}
                        />
                        <TextInput
                            label="Password"
                            mode="outlined"
                            activeOutlineColor="#006ffd"
                            placeholder="Nhập mật khẩu"
                            secureTextEntry={show}
                            right={
                                <TextInput.Icon
                                    onPress={(e) => setShow(!show)}
                                    icon={show ? 'eye-off' : 'eye'}
                                />
                            }
                            value={text}
                            onChangeText={(text) => setText(text)}
                        />

                        <Link
                            href="/(auth)/forget"
                            className="text-[#006ffd] font-bold"
                        >
                            Quên mật khẩu?
                        </Link>
                    </View>
                    <View className="mt-6">
                        <Button
                            mode="contained"
                            style={{ borderRadius: 10 }}
                            buttonColor="#006ffd"
                            onPress={() => handleLogin()}
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
                        <Text className="text-center mb-3">
                            Hoặc đăng nhập với
                        </Text>
                        <View className="flex flex-row gap-2 justify-center">
                            <View style={styles.btn} className="bg-[#ed3241]">
                                <Icon source="google" size={15} color="white" />
                            </View>
                            <View style={styles.btn} className="bg-[#1f2024]">
                                <Icon source="apple" size={15} color="white" />
                            </View>
                            <View style={styles.btn} className="bg-[#006ffd]">
                                <Icon
                                    source="facebook"
                                    size={15}
                                    color="white"
                                />
                            </View>
                        </View>
                    </View>
                </View>
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
        width: 40,
        height: 40,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
})
