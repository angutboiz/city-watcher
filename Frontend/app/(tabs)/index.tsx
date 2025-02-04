import { View, ImageBackground } from "react-native";
import React from "react";
import { Button, Text, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <ImageBackground
                source={require('../../assets/images/smart-city.jpg')}
                style={styles.backgroundImage}
            >
                <View style={styles.overlay}>
                    <View style={styles.content}>
                        <Text style={styles.title}>Xin chào Bình Dương!</Text>
                        
                        <TextInput
                            mode="outlined"
                            placeholder="Nhập số điện thoại"
                            style={styles.input}
                            theme={{ colors: { primary: '#00E5FF' } }}
                        />
                        
                        <TextInput
                            mode="outlined"
                            placeholder="Nhập mật khẩu"
                            secureTextEntry
                            style={styles.input}
                            theme={{ colors: { primary: '#00E5FF' } }}
                        />
                        
                        <Text style={styles.forgotPassword}>Quên mật khẩu?</Text>
                        
                        <Button
                            mode="contained"
                            style={styles.loginButton}
                            labelStyle={styles.loginButtonText}
                        >
                            Đăng nhập
                        </Button>
                        
                        <View style={styles.registerContainer}>
                            <Text>Bạn chưa có tài khoản? </Text>
                            <Text style={styles.registerLink}>Đăng ký ngay</Text>
                        </View>
                        
                        <Text style={styles.orText}>Hoặc đăng nhập với</Text>
                        
                        <View style={styles.socialButtons}>
                                <Button
                                    icon="google"
                                    mode="contained"
                                    style={[styles.socialButton, { backgroundColor: '#DB4437' }]}
                                />
                                <Button
                                    icon="apple"
                                    mode="contained"
                                    style={[styles.socialButton, { backgroundColor: '#000000' }]}
                                />
                                <Button
                                    icon="facebook"
                                    mode="contained"
                                    style={[styles.socialButton, { backgroundColor: '#1877F2' }]}
                                />
                        </View>
                    </View>
                </View>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 30,
        textAlign: 'center',
        color: '#00E5FF',
    },
    input: {
        marginBottom: 15,
        backgroundColor: 'white',
    },
    forgotPassword: {
        color: '#00E5FF',
        textAlign: 'left',
        marginBottom: 20,
    },
    loginButton: {
        marginBottom: 20,
        paddingVertical: 8,
        backgroundColor: '#00E5FF',
    },
    loginButtonText: {
        fontSize: 16,
        color: 'black',
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    registerLink: {
        color: '#00E5FF',
    },
    orText: {
        textAlign: 'center',
        marginBottom: 20,
        color: 'white',
    },
    socialButtons: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    socialButton: {
        width: 10,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 17,
    },
});
