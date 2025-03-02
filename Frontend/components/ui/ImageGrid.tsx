import React from 'react'
import { Image, Pressable, View } from 'react-native'
import { Text } from 'react-native-paper'
import ImageView from 'react-native-image-viewing'

const ImageGrid = () => {
    const randomImage = [
        'https://tiki.vn/blog/wp-content/uploads/2023/08/thumb-22.jpg',
        'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/03/anime-hay-nhat.jpg',
        'https://toquoc.mediacdn.vn/280518851207290880/2022/5/27/avatar1653666679855-1653666680336805904329.jpg',
        'https://cdn-media.sforum.vn/storage/app/media/anh-ac-quy-anime-thumbnail.jpg',
        'https://cdn-media.sforum.vn/storage/app/media/anh-ac-quy-anime-thumbnail.jpg',
    ]
    const [images, setImages] = React.useState<string[]>(randomImage)
    const imageObjects = images.map((uri) => ({ uri }))
    const [visible, setVisible] = React.useState(false)
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0)

    const handleImagePress = (index: number) => {
        setCurrentImageIndex(index)
        setVisible(true)
    }
    if (!images || images.length === 0) return null

    if (images.length === 1) {
        return (
            <>
                <Pressable
                    onPress={() => handleImagePress(0)}
                    className="max-h-[300px]"
                >
                    <Image
                        source={{ uri: images[0] }}
                        style={{
                            width: '100%',
                            height: 400,
                        }}
                        resizeMode="cover"
                    />
                </Pressable>
                <ImageView
                    images={imageObjects}
                    imageIndex={currentImageIndex}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                />
            </>
        )
    }

    if (images.length === 2) {
        return (
            <>
                <View className="flex-col max-h-[300px]">
                    {images.map((image, index) => (
                        <Pressable
                            key={index}
                            onPress={() => handleImagePress(index)}
                        >
                            <Image
                                source={{ uri: image }}
                                style={{
                                    width: '100%',
                                    height: '50%',
                                }}
                                resizeMode="cover"
                            />
                        </Pressable>
                    ))}
                </View>
                <ImageView
                    images={imageObjects}
                    imageIndex={currentImageIndex}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                />
            </>
        )
    }

    if (images.length === 3) {
        return (
            <>
                <View className="flex-row max-h-[300px] gap-1">
                    <Pressable
                        onPress={() => handleImagePress(0)}
                        style={{ width: '50%' }}
                    >
                        <Image
                            source={{ uri: images[0] }}
                            style={{ width: '100%', height: '100%' }}
                            resizeMode="cover"
                        />
                    </Pressable>
                    <View className="flex-col justify-between flex-1 gap-1">
                        {images.slice(1).map((image, index) => (
                            <Pressable
                                key={index}
                                onPress={() => handleImagePress(index + 1)}
                                style={{ width: '100%', height: '49.5%' }}
                            >
                                <Image
                                    source={{ uri: image }}
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                            </Pressable>
                        ))}
                    </View>
                </View>
                <ImageView
                    images={imageObjects}
                    imageIndex={currentImageIndex}
                    visible={visible}
                    onRequestClose={() => setVisible(false)}
                />
            </>
        )
    }

    return (
        <>
            <View className="flex-row h-[300px] gap-1">
                <Pressable
                    onPress={() => handleImagePress(0)}
                    className="flex-1 w-full h-full"
                >
                    <Image
                        source={{ uri: images[0] }}
                        style={{ width: '100%', height: '100%' }}
                        resizeMode="cover"
                    />
                </Pressable>
                <View className="relative flex-col flex-1 gap-1">
                    {images.slice(1, 4).map((image, index) => (
                        <Pressable
                            key={index}
                            onPress={() => handleImagePress(index + 1)}
                            style={{ width: '100%', height: 98 }}
                        >
                            <Image
                                source={{ uri: image }}
                                style={{ width: '100%', height: '100%' }}
                                resizeMode="cover"
                            />
                        </Pressable>
                    ))}
                    {images.length > 3 && (
                        <View
                            className="absolute right-0  flex items-center justify-center "
                            style={{
                                backgroundColor: '#007AFF',
                                opacity: 0.7,
                                borderRadius: 30,
                                width: 35,
                                height: 35,
                            }}
                        >
                            <Pressable onPress={() => handleImagePress(4)}>
                                <Text
                                    className="text-lg font-bold "
                                    style={{ color: 'white' }}
                                >
                                    +{images.length - 6}
                                </Text>
                            </Pressable>
                        </View>
                    )}
                </View>
            </View>
            <ImageView
                images={imageObjects}
                imageIndex={currentImageIndex}
                visible={visible}
                onRequestClose={() => setVisible(false)}
            />
        </>
    )
}

export default ImageGrid
