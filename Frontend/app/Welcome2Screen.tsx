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
import AsyncStorage from '@react-native-async-storage/async-storage'

const Welcome2Screen = () => {
    const [text, setText] = useState('')
    const [show, setShow] = useState(false)
    const navigation = useNavigation()
    const router = useRouter()
    useEffect(() => {
        navigation.setOptions({ headerShown: false })
    }, [navigation])

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
        <SafeAreaView style={{ flex: 1 }}>
            <View
                style={{
                    flex: 1,
                    padding: 5,
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                    }}
                >
                    <View style={{ flexDirection: 'row' }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: 16,
                                marginTop: 12,
                                marginLeft: 10,
                            }}
                        >
                            2
                        </Text>
                        <Text
                            style={{
                                color: 'gray',
                                fontSize: 16,
                                marginTop: 12,
                            }}
                        >
                            /3
                        </Text>
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

                <View
                    style={{ width: '100%', height: 300, overflow: 'hidden' }}
                >
                    <Image
                        style={{
                            width: '100%',
                            height: 350,
                            objectFit: 'cover',
                        }}
                        source={require('@/app/assets/images/test2.png')}
                    />
                </View>
                <View
                    style={{
                        backgroundColor: '#d3e6f3',
                        borderRadius: 10,
                        padding: 6,
                        width: '100%',
                        height: '30%',
                    }}
                >
                    <View>
                        <Text
                            style={{
                                textAlign: 'center',
                                color: '#006ffd',
                                fontWeight: 'bold',
                                fontSize: 24,
                            }}
                        >
                            Theo dõi tiến độ xử lý
                        </Text>
                        <View style={{ marginTop: 12 }}>
                            <Text
                                style={{ color: 'gray', textAlign: 'center' }}
                            >
                                Nhận thông báo về báo cáo của bạn.
                            </Text>
                            <Text
                                style={{ color: 'gray', textAlign: 'center' }}
                            >
                                Xem bản đồ trực tiếp vị trí sự cố, tiến độ xử lý
                                và trao đổi với chính quyền về báo cáo (nếu
                                cần).
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            height: 50,
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                        }}
                    >
                        <View
                            style={{
                                flexDirection: 'row',
                                gap: 8,
                                justifyContent: 'center',
                            }}
                        >
                            <View
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: '#006ffd',
                                }}
                            ></View>
                            <View
                                style={{
                                    width: 28,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: '#006ffd',
                                }}
                            ></View>
                            <View
                                style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: 4,
                                    backgroundColor: 'gray',
                                }}
                            ></View>
                        </View>
                        <View
                            style={{ position: 'absolute', top: -40, right: 0 }}
                        >
                            <TouchableOpacity
                                onPress={() => router.push('/welcome3')}
                            >
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#006ffd',
                                        borderRadius: 24,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 100,
                                    }}
                                >
                                    <Icon
                                        name="chevron-forward"
                                        size={24}
                                        color="white"
                                    />
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{ position: 'absolute', top: -40, left: 0 }}
                        >
                            <TouchableOpacity onPress={() => router.back()}>
                                <View
                                    style={{
                                        width: 40,
                                        height: 40,
                                        backgroundColor: '#006ffd',
                                        borderRadius: 24,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        marginTop: 100,
                                    }}
                                >
                                    <Icon
                                        name="chevron-back"
                                        size={24}
                                        color="white"
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

export default Welcome2Screen
