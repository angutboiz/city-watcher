import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

const GUI = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Giao diện',
            headerBackTitle: 'Quay lại',
        })
    }, [navigation])
    return (
        <SafeAreaView>
            <Text>GUI</Text>
        </SafeAreaView>
    )
}

export default GUI

const styles = StyleSheet.create({})
