import { Link, Stack } from 'expo-router'
import { StyleSheet } from 'react-native'

import { ThemedText } from '@/components/ThemedText'
import { ThemedView } from '@/components/ThemedView'

const NotFoundScreen = () => {
    return (
        <>
            <Stack.Screen options={{ title: 'Oops!' }} />
            <ThemedView style={styles.container}>
                <ThemedText type="title" style={{ color: '#006ffd' }}>
                    Trang này không tồn tại.
                </ThemedText>
                <Link href="/(tabs)/home" style={styles.link}>
                    <ThemedText type="link">Về trang chủ!</ThemedText>
                </Link>
            </ThemedView>
        </>
    )
}

export default NotFoundScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
})
