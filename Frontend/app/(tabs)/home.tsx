import {
    View,
    ScrollView,
    Image,
    ToastAndroid,
    RefreshControl,
    TextInput,
} from 'react-native'
import React, { useRef } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Searchbar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import Status from '@/components/ui/Status'
import { useRouter } from 'expo-router'
import axiosAPI from '@/services/axiosInstance'

const HomeScreen = () => {
    const router = useRouter()
    const handleChangeTab = () => {
        router.push('/home/incident-sent')
    }
    const [searchQuery, setSearchQuery] = React.useState('')
    const [refreshing, setRefreshing] = React.useState(false)
    const onRefresh = React.useCallback(async () => {
        setRefreshing(true)
        try {
            // Thực hiện các tác vụ refresh ở đây
            const response = await axiosAPI.get('/incident')
            if (response.data.ok) {
                // dispatch(setUser(response.data.user))
                ToastAndroid.show('Làm mới thành công', ToastAndroid.SHORT)
            }
        } catch (error) {
            console.error('Refresh error:', error)
            ToastAndroid.show('Làm mới thất bại', ToastAndroid.SHORT)
        } finally {
            setRefreshing(false)
        }
    }, [])
    return (
        <SafeAreaView className="">
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#007AFF']} // Màu của loading spinner
                        progressBackgroundColor="#ffffff"
                    />
                }
            >
                <View className="px-5 py-5 flex-row gap-5 w-full items-center">
                    <View className="">
                        <Image
                            style={{ width: 35, height: 35 }}
                            resizeMode="contain"
                            source={require('@/app/assets/images/ct-watcher-logo.png')}
                        ></Image>
                    </View>
                    <View className="flex-1 flex-row items-center gap-2 w-full border border-gray-300 rounded-full px-5">
                        <Ionicons name="search" size={18} color="#6b7280" />
                        <TextInput
                            placeholder="Tìm kiếm mọi thứ..."
                            className=""
                        ></TextInput>
                    </View>
                </View>
                <View>
                    <View className="items-center justify-center gap-5 flex-row px-5">
                        <Button
                            mode="contained"
                            className="!bg-blue-600 flex-1"
                            style={{ borderRadius: 10, paddingVertical: 3 }}
                            icon={() => (
                                <Ionicons
                                    name="newspaper-outline"
                                    size={18}
                                    color="#fff"
                                />
                            )}
                        >
                            Bản tin
                        </Button>
                        <Button
                            mode="contained"
                            textColor="#006ffd"
                            className="!bg-transparent !border !border-blue-600 flex-1"
                            style={{ borderRadius: 10, paddingVertical: 2 }}
                            onPress={handleChangeTab}
                            icon={() => (
                                <Ionicons
                                    name="nuclear"
                                    size={18}
                                    color="#006ffd"
                                />
                            )}
                        >
                            Sự cố đã gửi
                        </Button>
                    </View>
                </View>
                <View className="mt-2">
                    <Status />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen
