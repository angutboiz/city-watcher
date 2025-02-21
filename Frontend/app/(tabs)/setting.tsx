import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Image,
    Pressable,
    Modal,
    ToastAndroid,
    TouchableOpacity,
} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import axiosAPI from '@/services/axiosInstance'
import { IUser } from '@/types/type'
import { useRouter } from 'expo-router'
import { useAuth } from '@/hooks/useAuth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { setUser } from '@/store/features/userSlice'
import { useDispatch } from 'react-redux'
import ActionSheet, { useSheetRef } from 'react-native-actions-sheet'
import { Button } from 'react-native-paper'

const SettingItem = ({
    title,
    textColor = '#000',
    onPress,
}: {
    title: string
    textColor?: string
    onPress?: () => void
}) => (
    <Pressable style={styles.settingItem} onPress={onPress}>
        <Text style={[styles.settingText, { color: textColor }]}>{title}</Text>
        <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
    </Pressable>
)

const SettingScreen = () => {
    const [showLogoutModal, setShowLogoutModal] = useState(false)
    const [profile, setProfile] = useState<IUser>({} as IUser)
    const router = useRouter()
    const { user, isAuthenticated } = useAuth()
    const dispatch = useDispatch()
    const ref = useSheetRef<'snap-me'>()
    // const fetchProfile = async () => {
    //     const { data } = await axiosAPI.get('/profile')
    //     if (data.ok) {
    //         setProfile(data.data)
    //     }
    // }
    useEffect(() => {
        // fetchProfile()
    }, [])
    const handleChange = async (name_ui: string) => {
        if (name_ui === 'gui') return router.push('/setting/gui')
        if (name_ui === 'privacy') return router.push('/setting/privacy')
        if (name_ui === 'language') return router.push('/setting/language')
        if (name_ui === 'change-password') {
            try {
                const response = await axiosAPI.post('/auth/forget', {
                    email: user?.email,
                })

                if (response.data.ok) {
                    ToastAndroid.show(response.data.message, ToastAndroid.SHORT)
                    return router.push({
                        pathname: '/(auth)/change-password',
                        params: { email: user?.email },
                    })
                }
            } catch (error) {
                ToastAndroid.show('Đăng nhập thất bại', ToastAndroid.SHORT)
            }
        }
    }

    const handleLogout = async () => {
        try {
            // Lấy refresh token
            const refreshToken = await AsyncStorage.getItem('refreshToken')

            // Xóa tokens và user state trước
            await AsyncStorage.multiRemove(['accessToken', 'refreshToken'])
            dispatch(setUser({} as IUser))

            // Gọi API logout sau
            if (refreshToken) {
                await axiosAPI
                    .post('/auth/logout', { refreshToken })
                    .catch((err) => {
                        console.log('Logout API error:', err)
                        // Vẫn tiếp tục ngay cả khi API lỗi
                    })
            }

            // Đóng modal và chuyển hướng
            setShowLogoutModal(false)
            router.replace('/(auth)/login')
        } catch (error) {
            console.log('Logout error:', error)
            // Đảm bảo user vẫn được đưa về trang login ngay cả khi có lỗi
            setShowLogoutModal(false)
            router.replace('/(auth)/login')
        }
    }

    const handleOpenEditProfile = () => {
        ref.current?.show()
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headerTitle}>Cài đặt</Text>

            {/* Profile Section */}
            <View style={styles.profileSection}>
                <TouchableOpacity
                    style={styles.avatarContainer}
                    onPress={handleOpenEditProfile}
                >
                    <Image
                        source={{ uri: user?.profilePicture }}
                        style={styles.avatar}
                    />
                    <View style={styles.editIconContainer}>
                        <Ionicons name="pencil" size={12} color="#fff" />
                    </View>
                </TouchableOpacity>
                <Text style={styles.name}>
                    {user?.displayName || 'Chưa có tên'}
                </Text>
                <Text style={styles.username}>{user?.email}</Text>
            </View>

            {/* Settings List */}
            <View style={styles.settingsList}>
                <SettingItem
                    title="Giao diện"
                    onPress={() => handleChange('gui')}
                />
                <SettingItem
                    title="Ngôn ngữ"
                    onPress={() => handleChange('language')}
                />
                <SettingItem
                    title="Thay đổi mật khẩu"
                    onPress={() => handleChange('change-password')}
                />
                <SettingItem
                    title="Quyền riêng tư và bảo mật"
                    onPress={() => handleChange('privacy')}
                />
                <SettingItem
                    title="Đăng xuất"
                    textColor="#FF3B30"
                    onPress={() => setShowLogoutModal(true)}
                />
            </View>

            {/* Logout Modal */}
            <Modal
                animationType="fade"
                transparent={true}
                visible={showLogoutModal}
                onRequestClose={() => setShowLogoutModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Đăng xuất</Text>
                        <Text style={styles.modalMessage}>
                            Bạn có chắc chắn muốn đăng xuất không?{'\n'}
                            Bạn cần phải đăng nhập lại để sử dụng ứng dụng.
                        </Text>
                        <View style={styles.modalButtons}>
                            <Pressable
                                style={[
                                    styles.modalButton,
                                    styles.cancelButton,
                                ]}
                                onPress={() => setShowLogoutModal(false)}
                            >
                                <Text style={styles.cancelButtonText}>Hủy</Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.modalButton,
                                    styles.logoutButton,
                                ]}
                                onPress={handleLogout}
                            >
                                <Text style={styles.logoutButtonText}>
                                    Đăng xuất
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </Modal>
            <ActionSheet gestureEnabled snapPoints={[70, 100]}>
                <View
                    style={{
                        paddingHorizontal: 12,
                        height: 400,
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 10,
                    }}
                >
                    <Text
                        style={{
                            color: 'black',
                            fontSize: 30,
                        }}
                    >
                        Swipe me up!
                    </Text>

                    <Text
                        style={{
                            color: 'black',
                        }}
                    >
                        OR
                    </Text>

                    <Button
                        onPress={() => {
                            if (!ref.current) return
                            ref.current.snapToIndex(
                                ref.current?.currentSnapIndex() === 0 ? 1 : 0
                            )
                        }}
                        style={{
                            width: 250,
                        }}
                    >
                        Snap with a tap!
                    </Button>
                </View>
            </ActionSheet>
        </SafeAreaView>
    )
}

export default SettingScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginTop: 30,
        marginBottom: 32,
    },
    profileSection: {
        alignItems: 'center',
        marginBottom: 32,
    },
    avatarContainer: {
        position: 'relative',
        marginBottom: 12,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E1E1E1',
    },
    editIconContainer: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: '#007AFF',
        width: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#fff',
    },
    name: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 4,
    },
    username: {
        fontSize: 15,
        color: '#8E8E93',
    },
    settingsList: {
        paddingHorizontal: 16,
    },
    settingItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#C6C6C8',
    },
    settingText: {
        fontSize: 17,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 14,
        padding: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 17,
        fontWeight: '600',
        marginBottom: 8,
    },
    modalMessage: {
        fontSize: 13,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
        lineHeight: 18,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginHorizontal: 4,
    },
    cancelButton: {
        backgroundColor: '#F2F2F2',
    },
    logoutButton: {
        backgroundColor: '#007AFF',
    },
    cancelButtonText: {
        color: '#000',
        fontSize: 17,
        fontWeight: '400',
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 17,
        fontWeight: '600',
    },
})
