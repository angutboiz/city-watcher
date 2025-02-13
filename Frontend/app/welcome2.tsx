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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/Ionicons'

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
                            height: 350,
                            objectFit: 'cover',
                        }}
                        source={require('../assets/images/test2.png')}
                    ></Image>
                </View>
                <View>
                    <Text className="text-center text-[#006ffd] font-bold text-3xl">
                        Theo dõi tiến độ xử lý
                    </Text>
                    <View className="mt-3">
                        <Text className="text-gray-500 text-center">
                            Nhận thông báo về báo cáo của bạn.
                        </Text>
                        <Text className="text-gray-500 text-center">
                            Xem bản đồ trực tiếp vị trí sự cố, tiến độ xử lý và
                            trao đổi với chính quyền về báo cáo (nếu cần).
                        </Text>
                    </View>
                </View>
                <View className="relative h-5 flex flex-row items-center justify-center">
                    <View className="flex flex-row gap-2 justify-center">
                        <View className="w-2 h-2 rounded-full bg-[#006ffd]"></View>
                        <View className="w-7 h-2 rounded-full bg-[#006ffd]"></View>
                        <View className="w-2 h-2 rounded-full bg-gray-500"></View>
                    </View>
                    <View className="absolute top--10 right-0">
                        <TouchableOpacity
                            onPress={() => router.push('/welcome3')}
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
                    <View className="absolute top--10 left-0">
                        <TouchableOpacity onPress={() => router.back()}>
                            <View className="w-12 h-12 bg-[#006ffd] rounded-full flex items-center justify-center">
                                <Icon
                                    name="chevron-back"
                                    size={24}
                                    color="#ffffff"
                                />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Welcome2
