import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    Pressable,
    ScrollView,
    Image,
    Modal,
    ToastAndroid,
} from 'react-native'
import React, { useState } from 'react'
import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import * as Location from 'expo-location'
import MapView, { Marker } from 'react-native-maps'
import { Controller, useForm } from 'react-hook-form'
import { Button, TextInput } from 'react-native-paper'
import axiosAPI from '@/services/axiosInstance'
import { IFormInputIncident } from '@/types/type'
import { useRouter } from 'expo-router'
import { Dropdown } from 'react-native-element-dropdown'

const IncidentScreen = () => {
    const {
        control,
        setValue,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<IFormInputIncident>({
        defaultValues: {
            title: '',
            reciver_id: '',
            category_id: '',
            desc: '',
            image: [],
            location: '',
        },
    })
    const [isPublic, setIsPublic] = useState(false)
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<string[]>([])
    const [showManagerPicker, setShowManagerPicker] = useState(false)
    const [selectedManager, setSelectedManager] = useState<string | null>(null)
    const [location, setLocation] = useState<{
        latitude: number
        longitude: number
    } | null>(null)
    const [showMap, setShowMap] = useState(false)
    const [isPinning, setIsPinning] = useState(false)
    const [showProblemTypePicker, setShowProblemTypePicker] = useState(false)
    const [selectedProblemType, setSelectedProblemType] = useState<
        string | null
    >(null)

    const router = useRouter()

    const managers = [
        {
            label: 'Bùi Xuân Quang - QLKV Dĩ An',
            value: 'Bùi Xuân Quang - QLKV Dĩ An',
        },
        {
            label: 'Nguyễn Văn A - QLKV Thủ Đức',
            value: 'Nguyễn Văn A - QLKV Thủ Đức',
        },
        {
            label: 'Trần Thị B - QLKV Bình Thạnh',
            value: 'Trần Thị B - QLKV Bình Thạnh',
        },
        {
            label: 'Lê Văn C - QLKV Quận 9',
            value: 'Lê Văn C - QLKV Quận 9',
        },
    ]

    const problemTypes = [
        {
            id: 1,
            title: 'Công trình và cơ sở hạ tầng công cộng',
            icon: require('../assets/images/anh1.png'),
        },
        {
            id: 2,
            title: 'Một số tình huống nguy cấp',
            icon: require('../assets/images/anh4.png'),
        },
        {
            id: 3,
            title: 'Hạ tầng giao thông',
            icon: require('../assets/images/anh2.png'),
        },
        {
            id: 4,
            title: 'Môi trường và vệ sinh công cộng',
            icon: require('../assets/images/anh5.png'),
        },
        {
            id: 5,
            title: 'Sự cố điện, nước, viễn thông',
            icon: require('../assets/images/anh3.png'),
        },
        {
            id: 6,
            title: 'An ninh, trật tự và an toàn xã hội',
            icon: require('../assets/images/anh6.png'),
        },
    ]

    const pickImage = async () => {
        try {
            // Request permissions
            const { status } =
                await ImagePicker.requestMediaLibraryPermissionsAsync()

            if (status !== 'granted') {
                alert(
                    'Xin lỗi, chúng tôi cần quyền truy cập thư viện ảnh để thực hiện chức năng này!'
                )
                return
            }

            // Launch image picker
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsMultipleSelection: true,
                quality: 0.8,
                aspect: [4, 3],
            })

            if (!result.canceled && result.assets) {
                const newImages = result.assets.map((asset) => asset.uri)
                setImages((prevImages) => {
                    const combinedImages = [...prevImages, ...newImages]
                    const limitedImages = combinedImages.slice(0, 4)
                    setValue('image', limitedImages) // Cập nhật giá trị trong form
                    return limitedImages
                })
            }
        } catch (error) {
            console.error('Error picking image:', error)
            alert('Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.')
        }
    }

    const getCurrentLocation = async () => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                alert(
                    'Xin lỗi, chúng tôi cần quyền truy cập vị trí để thực hiện chức năng này!'
                )
                return
            }

            const currentLocation = await Location.getCurrentPositionAsync({})
            const { latitude, longitude } = currentLocation.coords
            setLocation({ latitude, longitude })
            handleLocationSelect(currentLocation.coords)
            setShowMap(true)
        } catch (error) {
            console.error('Error getting location:', error)
            alert('Không thể lấy vị trí hiện tại. Vui lòng thử lại.')
        }
    }

    // Cập nhật hàm submit
    const onSubmit = async (data: IFormInputIncident) => {
        console.log('click')
        console.log(data)
        try {
            setLoading(true)

            // Kiểm tra dữ liệu trước khi gửi
            // if (!data.title || !data.reciver_id || !data.category_id || !data.desc || !data.location || data.image.length === 0) {
            //     ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
            //     return;
            // }

            const formData = new FormData()
            formData.append('title', data.title)
            formData.append('reciver_id', data.reciver_id)
            formData.append('category_id', data.category_id)
            formData.append('desc', data.desc)
            formData.append('location', data.location)

            // Append images
            data.image.forEach((uri, index) => {
                formData.append('image', {
                    uri,
                    type: 'image/jpeg',
                    name: `image${index}.jpg`,
                })
            })

            console.log('Form data:', formData)

            const response = await axiosAPI.post('/incident/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (response.data.ok) {
                ToastAndroid.show('Gửi báo cáo thành công', ToastAndroid.SHORT)
                // Reset form hoặc chuyển hướng
                // router.back();
            }
        } catch (error) {
            console.error('Submit error:', error)
            ToastAndroid.show('Gửi báo cáo thất bại', ToastAndroid.SHORT)
        } finally {
            setLoading(false)
        }
    }

    // Cập nhật hàm xử lý khi chọn loại sự cố
    const handleSelectProblemType = (type: any) => {
        setSelectedProblemType(type.title)
        setValue('category_id', type.id)
        setShowProblemTypePicker(false)
    }

    // Cập nhật hàm xử lý khi chọn location
    const handleLocationSelect = (coordinates: {
        latitude: number
        longitude: number
    }) => {
        // Cập nhật vị trí hiện tại
        setLocation(coordinates)
        // Cập nhật giá trị form với string coordinates
        setValue('location', `${coordinates.latitude},${coordinates.longitude}`)
        setShowMap(false)
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Tạo báo cáo sự cố</Text>
            </View>
            <Text style={styles.headerSubtitle}>
                Các sự cố sẽ được xét duyệt nhanh nhất
            </Text>

            <ScrollView style={styles.form}>
                {/* Manager Selection */}
                <View>
                    <Controller
                        control={control}
                        name="reciver_id"
                        rules={{ required: 'Vui lòng chọn người quản lý' }}
                        render={({ field: { onChange, value } }) => (
                            <Dropdown
                                style={styles.dropdown}
                                placeholderStyle={styles.placeholderStyle}
                                selectedTextStyle={styles.selectedTextStyle}
                                inputSearchStyle={styles.inputSearchStyle}
                                iconStyle={styles.iconStyle}
                                data={managers}
                                search
                                maxHeight={300}
                                labelField="label"
                                valueField="value"
                                placeholder="Chọn người gửi"
                                searchPlaceholder="Tìm thông tin người quản lí khu vực..."
                                value={value}
                                onChange={onChange}
                            />
                        )}
                    ></Controller>
                    {errors.reciver_id && (
                        <Text className="text-red-500">
                            {errors.reciver_id.message}
                        </Text>
                    )}
                </View>
                {/* Title Input */}
                <View style={styles.formGroup}>
                    <Controller
                        control={control}
                        name="title"
                        rules={{ required: 'Vui lòng nhập tiêu đề' }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Tiêu đề"
                                mode="outlined"
                                value={value}
                                onChangeText={onChange}
                                error={!!errors.title}
                                activeOutlineColor="#006ffd"
                                autoCapitalize="none"
                            />
                        )}
                    ></Controller>
                    {errors.title && (
                        <Text className="text-red-500">
                            {errors.title.message}
                        </Text>
                    )}
                </View>

                {/* Problem Type Input */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Chọn thể loại sự cố</Text>
                    <Controller
                        control={control}
                        name="reciver_id"
                        rules={{ required: 'Vui lòng nhập tiêu đề' }}
                        render={({ field: { onChange, value } }) => (
                            <Pressable
                                style={styles.select}
                                onPress={() => setShowProblemTypePicker(true)}
                            >
                                <Text style={styles.selectText}>
                                    {selectedProblemType ||
                                        'Vui lòng chọn thể loại sự cố'}
                                </Text>
                                <Ionicons
                                    name="chevron-down"
                                    size={20}
                                    color="#000"
                                />
                            </Pressable>
                        )}
                    ></Controller>
                    {errors.reciver_id && (
                        <Text className="text-red-500">
                            {errors.reciver_id.message}
                        </Text>
                    )}
                </View>

                {/* Description Input */}
                <View style={styles.formGroup}>
                    <Controller
                        control={control}
                        name="desc"
                        rules={{ required: 'Vui lòng nhập mô tả sự cố' }}
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                label="Mô tả về sự cố"
                                value={value}
                                activeOutlineColor="#006ffd"
                                mode="outlined"
                                onChangeText={onChange}
                                multiline
                                numberOfLines={4}
                            />
                        )}
                    ></Controller>
                    {errors.desc && (
                        <Text className="text-red-500">
                            {errors.desc.message}
                        </Text>
                    )}
                </View>

                {/* Map Section */}
                <View style={styles.formGroup}>
                    <View style={styles.map}>
                        {location && (
                            <MapView
                                style={styles.fullMapView}
                                initialRegion={{
                                    latitude: location?.latitude || 0,
                                    longitude: location?.longitude || 0,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                            >
                                {location && (
                                    <Marker
                                        coordinate={location}
                                        draggable
                                        onDragEnd={(e) =>
                                            handleLocationSelect(
                                                e.nativeEvent.coordinate
                                            )
                                        }
                                    />
                                )}
                            </MapView>
                        )}
                    </View>
                    <Controller
                        control={control}
                        name="location"
                        rules={{ required: 'Bạn chưa chọn vị trí' }}
                        render={({ field: { onChange, value } }) => (
                            <Pressable
                                style={styles.locationButton}
                                onPress={getCurrentLocation}
                            >
                                <Text style={styles.locationButtonText}>
                                    Chọn vị trí hiện tại
                                </Text>
                            </Pressable>
                        )}
                    ></Controller>
                    {errors.location && (
                        <Text className="text-red-500">
                            {errors.location.message}
                        </Text>
                    )}
                </View>

                {/* Image Upload Section */}
                <View style={styles.formGroup}>
                    <Text style={styles.label}>Hình ảnh sự cố</Text>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={styles.imageList}
                    >
                        {images.map((uri, index) => (
                            <View key={index} style={styles.imageUploadBox}>
                                <Image
                                    source={{ uri }}
                                    style={styles.uploadedImage}
                                />
                            </View>
                        ))}
                        {Array.from({
                            length: Math.max(0, 4 - images.length),
                        }).map((_, index) => (
                            <View
                                key={`empty-${index}`}
                                style={styles.imageUploadBox}
                            >
                                <Ionicons name="image" size={24} color="#999" />
                            </View>
                        ))}
                    </ScrollView>
                    <View style={styles.dotIndicator}>
                        {[1, 2, 3, 4].map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.dot,
                                    index < images.length
                                        ? styles.activeDot
                                        : null,
                                ]}
                            />
                        ))}
                    </View>
                    <Controller
                        control={control}
                        name="image"
                        rules={{
                            required:
                                'Vui lòng tải ảnh lên để xác thực tính đúng đắn của sự cố',
                        }}
                        render={({ field: { onChange, value } }) => (
                            <Pressable
                                style={styles.uploadButton}
                                onPress={pickImage}
                            >
                                <Ionicons
                                    name="cloud-upload-outline"
                                    size={20}
                                    color="#fff"
                                    style={styles.uploadIcon}
                                />
                                <Text style={styles.uploadButtonText}>
                                    Tải ảnh
                                </Text>
                            </Pressable>
                        )}
                    ></Controller>
                    {errors.reciver_id && (
                        <Text className="text-red-500">
                            {errors.reciver_id.message}
                        </Text>
                    )}
                </View>

                {/* Public Toggle */}
                <View style={styles.toggleContainer}>
                    <Text style={styles.toggleLabel}>Công khai</Text>
                    <Pressable
                        style={[
                            styles.toggle,
                            isPublic
                                ? styles.toggleActive
                                : styles.toggleInactive,
                        ]}
                        onPress={() => setIsPublic(!isPublic)}
                    >
                        <View
                            style={[
                                styles.toggleHandle,
                                isPublic
                                    ? styles.toggleHandleActive
                                    : styles.toggleHandleInactive,
                            ]}
                        />
                    </Pressable>
                </View>
            </ScrollView>
            <View className="px-5 py-5">
                <Button
                    mode="contained"
                    style={{ borderRadius: 10, paddingVertical: 3 }}
                    buttonColor="#006ffd"
                    onPress={handleSubmit(onSubmit)}
                    loading={loading}
                    disabled={loading}
                    icon={() => (
                        <Ionicons
                            name="send"
                            size={20}
                            color="#fff"
                            style={styles.uploadIcon}
                        />
                    )}
                >
                    Gửi sự cố
                </Button>
            </View>

            {/* Location Map Modal */}
            <Modal
                visible={showMap}
                animationType="slide"
                onRequestClose={() => setShowMap(false)}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.modalTitle}>
                            {isPinning
                                ? 'Chạm vào bản đồ để chọn vị trí'
                                : 'Chọn vị trí'}
                        </Text>
                        <Pressable
                            onPress={() => setShowMap(false)}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={24} color="#000" />
                        </Pressable>
                    </View>

                    {location && (
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.fullMapView}
                                initialRegion={{
                                    latitude: location.latitude,
                                    longitude: location.longitude,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                onPress={(e) => {
                                    if (isPinning) {
                                        setLocation(e.nativeEvent.coordinate)
                                        setIsPinning(false)
                                    }
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                    }}
                                    draggable={!isPinning}
                                    onDragEnd={(e) => {
                                        setLocation(e.nativeEvent.coordinate)
                                    }}
                                />
                            </MapView>

                            <Pressable
                                style={[
                                    styles.pinButton,
                                    isPinning && styles.pinButtonActive,
                                ]}
                                onPress={() => setIsPinning(!isPinning)}
                            >
                                <MaterialIcons
                                    name="push-pin"
                                    size={24}
                                    color={isPinning ? '#fff' : '#007AFF'}
                                />
                            </Pressable>
                        </View>
                    )}

                    <Pressable
                        style={styles.confirmButton}
                        onPress={() => {
                            setIsPinning(false)
                            setShowMap(false)
                        }}
                    >
                        <Text style={styles.confirmButtonText}>
                            Xác nhận vị trí
                        </Text>
                    </Pressable>
                </SafeAreaView>
            </Modal>

            {/* Problem Type Modal */}
            <Modal
                visible={showProblemTypePicker}
                animationType="slide"
                style={styles.fullScreenModal}
            >
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <Pressable
                            onPress={() => setShowProblemTypePicker(false)}
                            style={styles.closeButton}
                        >
                            <Ionicons name="close" size={24} color="#000" />
                        </Pressable>
                    </View>

                    <ScrollView style={styles.problemTypeContainer}>
                        <View style={styles.problemTypeGrid}>
                            {problemTypes.map((type) => (
                                <Pressable
                                    key={type.id}
                                    style={[
                                        styles.problemTypeItem,
                                        selectedProblemType === type.title &&
                                            styles.selectedProblemType,
                                    ]}
                                    onPress={() =>
                                        handleSelectProblemType(type)
                                    }
                                >
                                    <View style={styles.problemTypeIcon}>
                                        <Image
                                            source={type.icon}
                                            style={styles.problemTypeIconImage}
                                        />
                                    </View>
                                    <Text style={styles.problemTypeText}>
                                        {type.title}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </ScrollView>

                    <Pressable
                        style={styles.selectButton}
                        onPress={() => {
                            setShowProblemTypePicker(false)
                        }}
                    >
                        <Text style={styles.selectButtonText}>Chọn</Text>
                    </Pressable>
                </SafeAreaView>
            </Modal>
        </SafeAreaView>
    )
}

export default IncidentScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 40,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '600',
    },
    headerSubtitle: {
        fontSize: 14,
        color: '#666',
        paddingHorizontal: 16,
        marginTop: 4,
    },
    form: {
        flex: 1,
        padding: 16,
    },
    formGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
        marginBottom: 8,
    },
    select: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
    },
    selectText: {
        fontSize: 16,
        color: '#000',
    },
    input: {
        padding: 12,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        fontSize: 16,
    },
    textArea: {
        height: 100,
        textAlignVertical: 'top',
    },
    map: {
        height: 200,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginBottom: 12,
        overflow: 'hidden',
    },
    mapView: {
        width: '100%',
        height: '100%',
    },
    locationButton: {
        backgroundColor: '#007AFF',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    locationButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    imageList: {
        flexDirection: 'row',
        marginBottom: 12,
    },
    imageUploadBox: {
        width: 80,
        height: 80,
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#D8D8D8',
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: '#007AFF',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 30,
    },
    toggleLabel: {
        fontSize: 16,
        fontWeight: '500',
    },
    toggle: {
        width: 51,
        height: 31,
        borderRadius: 16,
        padding: 2,
        justifyContent: 'center',
    },
    toggleActive: {
        backgroundColor: '#007AFF',
    },
    toggleInactive: {
        backgroundColor: '#E9E9EA',
    },
    toggleHandle: {
        width: 27,
        height: 27,
        borderRadius: 14,
        backgroundColor: '#fff',
        position: 'absolute',
    },
    toggleHandleActive: {
        right: 2,
    },
    toggleHandleInactive: {
        left: 2,
    },
    uploadButton: {
        flexDirection: 'row',
        backgroundColor: '#007AFF',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 12,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    uploadIcon: {
        marginRight: 4,
    },
    uploadedImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 16,
        maxHeight: '80%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '600',
    },
    closeButton: {
        padding: 4,
    },
    managerOption: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    managerOptionText: {
        fontSize: 16,
        color: '#000',
    },
    selectedManagerText: {
        color: '#007AFF',
        fontWeight: '500',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
    fullMapView: {
        flex: 1,
    },
    confirmButton: {
        backgroundColor: '#007AFF',
        margin: 16,
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    confirmButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    pinButton: {
        position: 'absolute',
        right: 16,
        top: 16,
        backgroundColor: '#fff',
        width: 44,
        height: 44,
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    pinButtonActive: {
        backgroundColor: '#007AFF',
    },
    fullScreenModal: {
        flex: 1,
        backgroundColor: '#fff',
    },
    problemTypeContainer: {
        flex: 1,
        padding: 8,
    },
    problemTypeGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    problemTypeItem: {
        width: '48%',
        height: 200,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    selectedProblemType: {
        borderWidth: 2,
        borderColor: '#007AFF',
    },
    problemTypeIcon: {
        width: '90%',
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },
    problemTypeIconImage: {
        width: 300,
        height: 120,
        resizeMode: 'contain',
    },
    problemTypeText: {
        fontSize: 16,
        textAlign: 'center',
        color: '#000',
        paddingHorizontal: 8,
        marginBottom: 10,
    },
    selectButton: {
        backgroundColor: '#007AFF',
        margin: 20,
        padding: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    selectButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },

    dropdown: {
        margin: 0,
        padding: 15,
        borderRadius: 5,
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
    },

    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },

    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})
function alert(arg0: string) {
    throw new Error('Function not implemented.')
}
