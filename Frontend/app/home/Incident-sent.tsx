import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from 'expo-router'

const IncidentSent = () => {
    const navigation = useNavigation()

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Sự cố đã gửi',
            headerBackTitle: 'Quay lại',
        })
    }, [navigation])
    return (
        <SafeAreaView>
            <View>
                <Text>IncidentSent</Text>
            </View>
        </SafeAreaView>
    )
}

export default IncidentSent
