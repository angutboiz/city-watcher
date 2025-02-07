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
import { Button, Icon, TextInput } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Welcome2 = () => {
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const navigation = useNavigation()
    const router = useRouter()
    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

    return (
        <SafeAreaView className="h-full w-full">
            <View className="h-full w-full p-5 flex flex-col justify-between">
                <View className="flex flex-row justify-between">
                    <View className="flex flex-row ">
                        <Text className="font-bold text-lg">2</Text>
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

                <View className="w-full h-[300px] overflow-hidden">
                    <Image
                        style={{
                            width: '100%',
                            height: 300,
                            objectFit: 'cover',
                        }}
                        source={require('../assets/images/Lifesavers - Waiting.png')}
                    ></Image>
                </View>
                <View>
                    <Text className="text-center text-[#006ffd] font-bold text-3xl">
                        Theo dõi tiến độ xử lý
                    </Text>
                    <View className="mt-3">
                        <Text className="text-gray-500">
                            Nhận thông báo về tình trạng báo cáo của bạn.
                        </Text>
                        <Text className="text-gray-500">
                            Xem bản đồ trực tiếp vị trí sự cố và tiến độ xử lý.
                        </Text>
                        <Text className="text-gray-500">
                            Trao đổi với chính quyền về báo cáo (nếu cần).
                        </Text>
                    </View>
                </View>
                <View className="relative h-5 flex flex-row items-center justify-center">
                    <View className="flex flex-row gap-2 justify-center">
                        <View className="w-2 h-2 rounded-full bg-gray-500"></View>
                        <View className="w-7 h-2 rounded-full bg-[#006ffd]"></View>
                        <View className="w-2 h-2 rounded-full bg-gray-500"></View>
                    </View>
                    <View className="absolute top-0 right-0">
                        <TouchableOpacity
                            onPress={() => router.push('/welcome3')}
                        >
                            <Text className="text-[#006ffd] font-bold">
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View className="absolute top-0 left-0">
                        <TouchableOpacity onPress={() => router.back()}>
                            <Text className="text-[#006ffd] font-bold">
                                Quay lại
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome2
