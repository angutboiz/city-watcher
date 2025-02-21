import { View, Text, StyleSheet, SafeAreaView } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'

const NotificationScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            {/* Empty State */}
            <View style={styles.emptyStateContainer}>
                <View style={styles.iconContainer}>
                    <View style={styles.iconCircle}>
                        <View style={styles.iconInnerCircle}>
                            <Ionicons
                                name="notifications-off"
                                size={24}
                                color="black"
                            />
                        </View>
                    </View>
                </View>
                <Text style={styles.title}>Không có thông báo</Text>
                <Text style={styles.subtitle}>
                    Thông báo của bạn sẽ được xuất hiện trên trang này
                </Text>
            </View>
        </SafeAreaView>
    )
}

export default NotificationScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    iconContainer: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconCircle: {
        width: '100%',
        height: '100%',
        borderRadius: 60,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconInnerCircle: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        color: '#000',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#8E8E93',
        paddingHorizontal: 20,
    },
})
