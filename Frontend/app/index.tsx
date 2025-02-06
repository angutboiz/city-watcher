import {
    ImageBackground,
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import React, { useState } from 'react'
import { Link, useNavigation, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Icon, TextInput } from 'react-native-paper'

const Welcome1 = () => {
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const router = useRouter()

    return (
        <SafeAreaView className="h-full w-full">
            <View className="h-full w-full p-5 flex flex-col justify-between">
                <View className="flex flex-row justify-between">
                    <View className="flex flex-row ">
                        <Text className="font-bold text-lg">1</Text>
                        <Text className="text-gray-400 text-lg">/3</Text>
                    </View>
                    <View>
                        <Link
                            href="/(auth)/login"
                            className="text-[#006ffd] font-bold text-lg"
                        >
                            Bỏ qua
                        </Link>
                    </View>
                </View>
                <Image
                    style={{ width: '130%', height: 300, objectFit: 'cover' }}
                    source={require('../assets/images/Beep Beep - Road Works.png')}
                ></Image>
                <View>
                    <Text className="text-center text-[#006ffd] font-bold text-3xl">
                        Báo cáo sự cố chỉ với {'\n'}"một chạm"
                    </Text>
                    <View className="mt-3">
                        <Text className="text-gray-500">
                            Chụp ảnh hoặc quay video sự cố.
                        </Text>
                        <Text className="text-gray-500">
                            Chọn loại sự cố (ví dụ: đèn đường hỏng, ổ gà, rác
                            thải...).
                        </Text>
                        <Text className="text-gray-500">
                            Hệ thống tự động xác định vị trí của bạn.
                        </Text>
                        <Text className="text-gray-500">
                            Gửi báo cáo ngay lập tức!
                        </Text>
                    </View>
                </View>
                <View className="relative h-5 flex flex-row items-center justify-center">
                    <View className="flex flex-row gap-2 justify-center">
                        <View className="w-7 h-2 rounded-full bg-[#006ffd]"></View>
                        <View className="w-2 h-2 rounded-full bg-gray-500"></View>
                        <View className="w-2 h-2 rounded-full bg-gray-500"></View>
                    </View>
                    <View className="absolute top-0 right-0">
                        <TouchableOpacity
                            onPress={() => router.push('/welcome2')}
                        >
                            <Text className="text-[#006ffd] font-bold">
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome1
