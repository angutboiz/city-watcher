import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'

const HomeScreen = () => {
    return (
        <ScrollView style={styles.container}>
            {/* Notifications Section */}
            <View style={styles.sectionHeader}>
                <Image 
                    source={require('../assets/images/image4.png')}
                    style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Đáng chú ý</Text>
            </View>
            <ScrollView horizontal style={styles.cardContainer}>
                <TouchableOpacity style={styles.card}>
                    <Image 
                        source={require('../assets/images/image1.png')} 
                        style={styles.cardImage}
                    />
                    <Text style={styles.cardTitle}>Tiêu đề mẫu tin</Text>
                    <Text style={styles.cardSubtitle}>Ngày viết</Text>
                </TouchableOpacity>
                {/* Additional cards can be added here */}
            </ScrollView>

            {/* Reports Section */}
            <View style={styles.sectionHeader}>
                <Image 
                    source={require('../assets/images/image5.png')}
                    style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Báo cáo trước đó</Text>
            </View>
            <View style={styles.emptyStateContainer}>
                <Image 
                    source={require('../assets/images/image2.png')} 
                    style={styles.emptyStateImage}
                />
                <Text style={styles.emptyStateText}>
                    Bạn chưa gửi báo cáo nào,{'\n'}
                    hãy gửi báo cáo và giữ an toàn bạn nhé
                </Text>
            </View>

            {/* Pending Messages Section */}
            <View style={styles.sectionHeader}>
                <Image 
                    source={require('../assets/images/image6.png')}
                    style={styles.sectionIcon}
                />
                <Text style={styles.sectionTitle}>Tin nhắn đang chờ</Text>
            </View>
            <View style={styles.messageList}>
                {/* Message Item */}
                <TouchableOpacity style={styles.messageItem}>
                    <Image 
                        source={require('../assets/images/image3.png')} 
                        style={styles.messageAvatar}
                    />
                    <View style={styles.messageContent}>
                        <Text style={styles.messageName}>Haley James</Text>
                        <Text style={styles.messageText}>Stand up for what you believe in</Text>
                    </View>
                    <View style={styles.messageIndicator} />
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 12,
    },
    sectionIcon: {
        width: 24,
        height: 24,
        marginRight: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    cardContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    card: {
        width: 150,
        marginRight: 12,
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderRadius: 8,
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: '500',
        marginTop: 4,
    },
    cardSubtitle: {
        fontSize: 12,
        color: '#666',
    },
    emptyStateContainer: {
        alignItems: 'center',
        padding: 20,
    },
    emptyStateImage: {
        width: 200,
        height: 200,
        marginBottom: 12,
    },
    emptyStateText: {
        textAlign: 'center',
        color: '#666',
        lineHeight: 20,
    },
    messageList: {
        marginTop: 8,
    },
    messageItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
    },
    messageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    messageContent: {
        flex: 1,
        marginLeft: 12,
    },
    messageName: {
        fontSize: 16,
        fontWeight: '500',
    },
    messageText: {
        color: '#666',
    },
    messageIndicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#007AFF',
    },
})
