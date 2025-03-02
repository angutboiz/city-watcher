import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons'
import ImageGrid from './ImageGrid'
import ActionSheet, { useSheetRef } from 'react-native-actions-sheet'

const Status = () => {
    const [helpfulColor, setHelpfulColor] = React.useState(false)
    const [unhelpfulColor, setUnhelpfulColor] = React.useState(false)
    const [helpful, setHelpful] = React.useState(5)
    const ref = useSheetRef<'snap-me'>()
    const handleOpenDetailStatus = () => {
        ref.current?.show()
    }
    const handleChangeHelpful = (helpfulColor: boolean) => {
        if (helpfulColor) {
            setHelpfulColor(true)
            setUnhelpfulColor(false)
            setHelpful(helpful + 1)
        } else {
            setHelpfulColor(false)
            setHelpful(helpful - 1)
        }
    }

    const handleChangeUnHelpful = (unHelpfulColor: boolean) => {
        if (unHelpfulColor) {
            setUnhelpfulColor(true)
            setHelpfulColor(false)
            setHelpful(helpful - 1)
        } else {
            setUnhelpfulColor(false)
            setHelpful(helpful + 1)
        }
    }
    return (
        <View className="h-[450px]">
            <View className="flex-row justify-between items-center p-5">
                <View className="flex-row gap-2 items-center">
                    <Image
                        source={require('@/app/assets/images/avatar.jpg')}
                        style={{
                            width: 40,
                            height: 40,
                            borderRadius: 20,
                        }}
                    ></Image>
                    <View>
                        <Text className="font-bold text-gray-700">
                            Trong An
                        </Text>
                        <Text className="text-gray-700 text-sm">
                            10 giờ trước
                        </Text>
                    </View>
                </View>
                <View>
                    <Button
                        onPress={handleOpenDetailStatus}
                        className="w-10 h-10 flex items-center justify-center rounded-full"
                        mode="text"
                    >
                        <Ionicons
                            name="ellipsis-vertical"
                            size={18}
                            color="black"
                        />
                    </Button>
                </View>
            </View>
            <View className="h-[300px]">
                <ImageGrid />
            </View>
            <View className="flex-row">
                <Button
                    mode="text"
                    textColor={helpfulColor ? '#006ffd' : 'black'}
                    onPress={() => handleChangeHelpful(!helpfulColor)}
                    icon={() => (
                        <Ionicons
                            name="chevron-up-outline"
                            size={24}
                            color={helpfulColor ? '#006ffd' : 'black'}
                        />
                    )}
                >
                    {helpful}
                </Button>
                <Button
                    mode="text"
                    textColor={unhelpfulColor ? '#006ffd' : 'black'}
                    onPress={() => handleChangeUnHelpful(!unhelpfulColor)}
                    icon={() => (
                        <Ionicons
                            name="chevron-down"
                            size={24}
                            color={unhelpfulColor ? '#006ffd' : 'black'}
                        />
                    )}
                >
                    {unhelpfulColor ? 'Không hữu ích' : 'Hữu ích'}
                </Button>
            </View>
            <ActionSheet gestureEnabled={true} ref={ref}>
                <View className="bg-white flex-col gap-3 px-5 py-3 h-[300px]">
                    <Button
                        mode="text"
                        textColor="#006ffd"
                        onPress={() => {}}
                        icon={() => (
                            <Ionicons
                                name="bookmark-outline"
                                size={24}
                                color="#006ffd"
                            />
                        )}
                    >
                        Lưu bài viết
                    </Button>
                    <Button
                        mode="text"
                        textColor="#006ffd"
                        onPress={() => {}}
                        icon={() => (
                            <Ionicons
                                name="share-social-outline"
                                size={24}
                                color="#006ffd"
                            />
                        )}
                    >
                        Chia sẻ bài viết
                    </Button>
                    <Button
                        mode="text"
                        textColor="#006ffd"
                        onPress={() => {}}
                        icon={() => (
                            <Ionicons
                                name="copy-outline"
                                size={24}
                                color="#006ffd"
                            />
                        )}
                    >
                        Sao chép liên kết
                    </Button>
                    <Button
                        mode="text"
                        textColor="#006ffd"
                        onPress={() => {}}
                        icon={() => (
                            <Ionicons
                                name="close-circle-outline"
                                size={24}
                                color="#006ffd"
                            />
                        )}
                    >
                        Ẩn bài biết
                    </Button>

                    <Button
                        mode="text"
                        textColor="#006ffd"
                        onPress={() => {}}
                        icon={() => (
                            <Ionicons
                                name="alert-circle"
                                size={24}
                                color="#006ffd"
                            />
                        )}
                    >
                        Báo cáo bài viết
                    </Button>
                </View>
            </ActionSheet>
        </View>
    )
}

export default Status

const styles = StyleSheet.create({})
