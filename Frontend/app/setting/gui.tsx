import {
    StyleSheet,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const GUI = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Giao diện',
            headerBackTitle: 'Quay lại',
        })
    }, [navigation])

    const { colorScheme, setColorScheme } = useColorScheme()
    const [selectedTheme, setSelectedTheme] = useState(colorScheme)

    const handleThemeChange = (theme: 'light' | 'dark' | 'system') => {
        setSelectedTheme(theme)
        // setColorScheme(theme)
    }
    return (
        <SafeAreaView>
            <View className="flex items-center justify-center  p-5 rounded-lg">
                <View className="flex-row gap-3">
                    <TouchableOpacity
                        className={`p-4 rounded-lg border-2 flex-1 items-center justify-center ${
                            selectedTheme === 'light'
                                ? 'border-blue-500'
                                : 'border-gray-300'
                        }`}
                        onPress={() => handleThemeChange('light')}
                    >
                        <Ionicons
                            name="sunny"
                            size={30}
                            color={
                                selectedTheme == 'light' ? '#006ffd' : '#9ca3af'
                            }
                        />
                        <Text
                            className={` mt-2 text-center ${
                                selectedTheme == 'light'
                                    ? 'text-[#006ffd]'
                                    : 'text-gray-400'
                            }`}
                        >
                            Light
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`p-4 rounded-lg border-2 flex-1 items-center justify-center ${
                            selectedTheme === 'dark'
                                ? 'border-blue-500'
                                : 'border-gray-300'
                        }`}
                        onPress={() => handleThemeChange('dark')}
                    >
                        <Ionicons
                            name="moon"
                            size={30}
                            color={
                                selectedTheme == 'dark' ? '#006ffd' : '#9ca3af'
                            }
                        />
                        <Text
                            className={` mt-2 text-center ${
                                selectedTheme == 'dark'
                                    ? 'text-[#006ffd]'
                                    : 'text-gray-400'
                            }`}
                        >
                            Dark
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`p-4 rounded-lg border-2 flex-1 items-center justify-center ${
                            selectedTheme === 'system'
                                ? 'border-blue-500'
                                : 'border-gray-300'
                        }`}
                        onPress={() => handleThemeChange('system')}
                    >
                        <Ionicons
                            name="hardware-chip"
                            size={30}
                            color={
                                selectedTheme == 'system'
                                    ? '#006ffd'
                                    : '#9ca3af'
                            }
                        />
                        <Text
                            className={` mt-2 text-center ${
                                selectedTheme == 'system'
                                    ? 'text-[#006ffd]'
                                    : 'text-gray-400'
                            }`}
                        >
                            System
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default GUI

const styles = StyleSheet.create({})
