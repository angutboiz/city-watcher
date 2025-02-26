// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import { SafeAreaView } from 'react-native-safe-area-context'
// import { useLocalSearchParams, useRouter } from 'expo-router'
// import { Button } from 'react-native-paper'

// const OTPScreen = () => {
//     const { email } = useLocalSearchParams<{ email: string }>()
//     const [loading, setLoading] = useState(false)
//     const router = useRouter()
//     const handleSubmitOTP = () => {
//         router.push('/(auth)/login')
//     }
//     return (
//         <SafeAreaView>
//             <View className="px-3 py-5">
//                 <Text className="text-gray-500 text-md">
//                     Mã đã được gửi tới
//                 </Text>
//                 <Text className="text-xl font-bold text-blue-500">{email}</Text>
//                 <Button
//                     mode="contained"
//                     loading={loading}
//                     disabled={loading}
//                     className="!rounded-lg"
//                     onPress={handleSubmitOTP}
//                     style={{
//                         backgroundColor: '#006ffd',
//                     }}
//                 >
//                     Xác nhận OTP
//                 </Button>
//             </View>
//         </SafeAreaView>
//     )
// }

// export default OTPScreen

// const styles = StyleSheet.create({})
