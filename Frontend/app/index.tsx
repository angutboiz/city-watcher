import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Welcome1Screen = () => {
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const router = useRouter()

    const saveSkipWelcome = async () => {
        await AsyncStorage.setItem('skipWelcome', 'true')
        router.push('/(auth)/login')
    }

    const checkSkipWelcome = async () => {
        const checkSkipWelcome = await AsyncStorage.getItem('skipWelcome')
        if (checkSkipWelcome) {
            router.push('/(auth)/login')
        }
    }

    useEffect(() => {
        checkSkipWelcome()
    }, [])

    return (
        <SafeAreaView className="h-full w-full">
            <View className="h-full w-full p-5 flex flex-col justify-between">
                <View className="flex flex-row justify-between">
                    <View className="flex flex-row ">
                        <Text className="font-bold text-lg">1</Text>
                        <Text className="text-gray-400 text-lg">/3</Text>
                    </View>
                    <View>
                        <Text
                            onPress={saveSkipWelcome}
                            className="text-[#006ffd] font-bold text-lg"
                        >
                            Bỏ qua
                        </Text>
                    </View>
                </View>

                <View className="flex items-center justify-center bg-white">
                    <View className="relative w-[300px] h-[200px]">
                        {/* Top cloud */}
                        <Image
                            style={{
                                width: 123,
                                height: 56,
                                position: 'absolute',
                                top: 0,
                                left: 10,
                            }}
                            source={require('@/app/assets/images/Vector1.png')}
                        />

                        {/* Main illustration */}
                        <Image
                            style={{
                                width: 230,
                                height: 230,
                                position: 'absolute',
                                top: 30,
                                left: '50%',
                                transform: [{ translateX: -100 }],
                            }}
                            source={require('@/app/assets/images/test1.png')}
                        />

                        {/* Bottom cloud */}
                        <Image
                            style={{
                                width: 100,
                                height: 45,
                                position: 'absolute',
                                bottom: -80,
                                right: 20,
                            }}
                            source={require('@/app/assets/images/Vector1.png')}
                        />
                    </View>
                </View>

                <View className="bg-[#d3e6f3] rounded-xl p-6 w-full">
                    <Text className="text-center text-[#006ffd] font-bold text-2xl mb-4">
                        Báo cáo sự cố chỉ với {'\n'}"một chạm"
                    </Text>
                    <Text className="text-center text-gray-500 leading-6">
                        Chỉ với một chạm, bạn hoàn toàn có thể{'\n'}
                        chụp ảnh hoặc quay video sự cố.{'\n'}
                        Chọn loại sự cố và hệ thống sẽ tự động{'\n'}
                        xác định vị trí của bạn.{'\n'}
                        Hãy gửi báo cáo ngay lập tức!
                    </Text>

                    <View className="mt-6 flex flex-row items-center justify-center">
                        <View className="flex flex-row gap-2 justify-center">
                            <View className="w-6 h-2 rounded-full bg-[#006ffd]"></View>
                            <View className="w-2 h-2 rounded-full bg-gray-300"></View>
                            <View className="w-2 h-2 rounded-full bg-gray-300"></View>
                        </View>
                    </View>

                    <TouchableOpacity
                        onPress={() => router.push('/welcome2')}
                        className="mt-4 self-center"
                    >
                        <View className="w-12 h-12 bg-[#006ffd] rounded-full flex items-center justify-center">
                            <Icon
                                name="chevron-forward"
                                size={24}
                                color="#ffffff"
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome1Screen
