import { Tabs } from 'expo-router'
import React from 'react'
import { Platform } from 'react-native'

import { HapticTab } from '@/components/HapticTab'
import { IconSymbol } from '@/components/ui/IconSymbol'
import TabBarBackground from '@/components/ui/TabBarBackground'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'
import { StatusBar } from 'expo-status-bar'
import { Icon } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#007AFF', // iOS blue color
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,

                tabBarItemStyle: {
                    paddingVertical: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    marginTop: 4,
                },

                tabBarStyle: {
                    elevation: 10, // Loại bỏ shadow trên Android
                    shadowOpacity: 10, // Loại bỏ shadow trên iOS
                    shadowColor: 'rgba(0, 0, 0, 0.9)', // Màu shadow
                    shadowRadius: 10,
                    borderTopWidth: 0, // Bỏ viền trên tab bar
                    backgroundColor: 'white', // Màu nền (có thể thay đổi)
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused ? 'home' : 'home-outline'
                        return (
                            <Ionicons name={iconName} size={28} color={color} />
                        )
                    },
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Tin nhắn',
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused
                            ? 'chatbubble'
                            : 'chatbubble-outline'
                        return (
                            <Ionicons name={iconName} size={28} color={color} />
                        )
                    },
                }}
            />
            <Tabs.Screen
                name="incident"
                options={{
                    title: 'Sự cố',
                    tabBarIcon: ({ color, focused }) => (
                        <Icon size={28} source="plus" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Thông báo',
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused
                            ? 'notifications'
                            : 'notifications-outline'
                        return (
                            <Ionicons name={iconName} size={28} color={color} />
                        )
                    },
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Cài đặt',
                    tabBarIcon: ({ color, focused }) => {
                        let iconName = focused ? 'settings' : 'settings-outline'
                        return (
                            <Ionicons name={iconName} size={28} color={color} />
                        )
                    },
                }}
            />
            <StatusBar backgroundColor="#161622" style="light" />
        </Tabs>
    )
}
