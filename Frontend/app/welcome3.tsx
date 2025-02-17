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

const Welcome3 = () => {
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
                        <Text className="font-bold text-lg">3</Text>
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
                <View className="w-full h-[300px] overflow-hidden flex items-center justify-center bg-white">
                    <View className="relative w-full h-full">
                        <Image
                            style={{
                                width: '100%',
                                height: '60%',
                                position: 'absolute',
                                bottom: 0,
                                objectFit: 'contain',
                            }}
                            source={require('../assets/images/test4.png')}
                        />
                        <Image
                            style={{
                                width: '100%',
                                height: '50%',
                                position: 'absolute',
                                top: 10,
                                objectFit: 'contain',
                            }}
                            source={require('../assets/images/test3.png')}
                        />
                    </View>
                </View>
                <View className="bg-[#d3e6f3] rounded-xl p-6 w-full h-72">
                <View>
                    <Text className="text-center text-[#006ffd] font-bold text-3xl">
                        Cùng chung tay xây dựng đô thị
                    </Text>
                    <View className="mt-3">
                        <Text className="text-center text-gray-500">
                            Góp ý, đánh giá về cách xử lý sự cố.{'\n'}
                            Chia sẻ thông tin hữu ích cho cộng đồng.{'\n'}
                            Cùng chúng tôi cải thiện ứng dụng!
                        </Text>
                    </View>
                </View>
                <View className="relative h-5 flex flex-row items-center justify-center">
                    <View className="flex flex-row gap-2 justify-center">
                        <View className="w-2 h-2 rounded-full bg-[#006ffd]"></View>
                        <View className="w-2 h-2 rounded-full bg-[#006ffd]"></View>
                        <View className="w-7 h-2 rounded-full bg-[#006ffd]"></View>
                    </View>
                    <View className="absolute top-9 right-0">
                        <Link
                            href="/(tabs)/home"
                            className="text-[#006ffd] font-bold"
                        >
                            <View className="w-12 h-12 bg-[#006ffd] rounded-full flex items-center justify-center">
                                <Icon
                                    name="chevron-forward"
                                    size={24}
                                    color="#ffffff"
                                />
                            </View>
                        </Link>
                    </View>
                    <View className="absolute top-9 left-0">
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
            </View>
        </SafeAreaView>
    )
}

export default Welcome3
