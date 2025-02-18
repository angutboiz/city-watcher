import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

const Language = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Ngôn ngữ',
            headerBackTitle: 'Quay lại',
        })
    }, [navigation])
    return (
        <SafeAreaView>
            <Text>Language</Text>
        </SafeAreaView>
    )
}

export default Language

const styles = StyleSheet.create({})
