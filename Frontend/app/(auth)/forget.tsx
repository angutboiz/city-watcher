import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { SafeAreaView } from 'react-native-safe-area-context'

const ForgetScreen = () => {
    return (
        <KeyboardAwareScrollView
            enableOnAndroid
            extraHeight={150}
            extraScrollHeight={100}
        >
            <SafeAreaView>
                <View className="px-6 py-10">
                    <Text>ForgetScreen</Text>
                    <Link href="/(auth)/login" className="text-blue-500">
                        về đăng nhập
                    </Link>
                </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
    )
}

export default ForgetScreen

const styles = StyleSheet.create({})
