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

export default function TabLayout() {
    const colorScheme = useColorScheme()

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
                headerShown: false,
                tabBarButton: HapticTab,
                tabBarBackground: TabBarBackground,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: 'absolute',
                    },
                    default: {},
                }),
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Trang chủ',
                    tabBarIcon: ({ color }) => (
                        <Icon size={28} source="home" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="chat"
                options={{
                    title: 'Tin nhắn',
                    tabBarIcon: ({ color }) => (
                        <Icon size={28} source="message" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="incident"
                options={{
                    title: 'Sự cố',
                    tabBarIcon: ({ color }) => (
                        <Icon size={28} source="plus" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: 'Thông báo',
                    tabBarIcon: ({ color }) => (
                        <Icon size={28} source="bell" color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="setting"
                options={{
                    title: 'Cài đặt',
                    tabBarIcon: ({ color }) => (
                        <Icon size={28} source="shield" color={color} />
                    ),
                }}
            />
            <StatusBar backgroundColor="#161622" style="light" />
        </Tabs>
    )
}
