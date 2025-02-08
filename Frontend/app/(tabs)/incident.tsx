import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable, ScrollView, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function IncidentScreen() {
  const [isPublic, setIsPublic] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [showManagerPicker, setShowManagerPicker] = useState(false);
  const [selectedManager, setSelectedManager] = useState<string | null>(null);
  const [location, setLocation] = useState<{latitude: number, longitude: number} | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [isPinning, setIsPinning] = useState(false);

  const managers = [
    'Bùi Xuân Quang - QLKV Dĩ An',
    'Nguyễn Văn A - QLKV Thủ Đức',
    'Trần Thị B - QLKV Bình Thạnh',
    'Lê Văn C - QLKV Quận 9'
  ];

  const pickImage = async () => {
    try {
      // Request permissions
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      
      if (status !== 'granted') {
        alert('Xin lỗi, chúng tôi cần quyền truy cập thư viện ảnh để thực hiện chức năng này!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        quality: 0.8,
        aspect: [4, 3],
      });

      if (!result.canceled && result.assets) {
        const newImages = result.assets.map(asset => asset.uri);
        setImages(prevImages => {
          const combinedImages = [...prevImages, ...newImages];
          return combinedImages.slice(0, 4); // Limit to 4 images
        });
      }
    } catch (error) {
      console.error('Error picking image:', error);
      alert('Có lỗi xảy ra khi tải ảnh. Vui lòng thử lại.');
    }
  };

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Xin lỗi, chúng tôi cần quyền truy cập vị trí để thực hiện chức năng này!');
        return;
      }

      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      setShowMap(true);
    } catch (error) {
      console.error('Error getting location:', error);
      alert('Không thể lấy vị trí hiện tại. Vui lòng thử lại.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tạo báo cáo sự cố</Text>
      </View>
      <Text style={styles.headerSubtitle}>Các sự cố sẽ được xét duyệt nhanh nhất</Text>

      <ScrollView style={styles.form}>
        {/* Manager Selection */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Chọn người quản lý khu vực</Text>
          <Pressable 
            style={styles.select}
            onPress={() => setShowManagerPicker(true)}
          >
            <Text style={styles.selectText}>
              {selectedManager || 'Chọn người quản lý'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#000" />
          </Pressable>
        </View>

        {/* Title Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Tiêu đề</Text>
          <TextInput 
            style={styles.input}
            placeholder="Nhập tiêu đề của sự cố"
            placeholderTextColor="#999"
          />
        </View>

        {/* Description Input */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Mô tả chi tiết</Text>
          <TextInput 
            style={[styles.input, styles.textArea]}
            placeholder="Mô tả chi tiết về sự cố đó..."
            placeholderTextColor="#999"
            multiline
            numberOfLines={4}
          />
        </View>

        {/* Map Section */}
        <View style={styles.formGroup}>
          <View style={styles.map}>
            {location && (
              <MapView
                style={styles.mapView}
                initialRegion={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.005,
                  longitudeDelta: 0.005,
                }}
              >
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude,
                  }}
                />
              </MapView>
            )}
          </View>
          <Pressable style={styles.locationButton} onPress={getCurrentLocation}>
            <Text style={styles.locationButtonText}>Chọn vị trí hiện tại</Text>
          </Pressable>
        </View>

        {/* Image Upload Section */}
        <View style={styles.formGroup}>
          <Text style={styles.label}>Hình ảnh sự cố</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageList}>
            {images.map((uri, index) => (
              <View key={index} style={styles.imageUploadBox}>
                <Image source={{ uri }} style={styles.uploadedImage} />
              </View>
            ))}
            {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, index) => (
              <View key={`empty-${index}`} style={styles.imageUploadBox}>
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
                  index < images.length ? styles.activeDot : null
                ]} 
              />
            ))}
          </View>
          <Pressable style={styles.uploadButton} onPress={pickImage}>
            <Ionicons name="cloud-upload-outline" size={20} color="#fff" style={styles.uploadIcon} />
            <Text style={styles.uploadButtonText}>Tải ảnh</Text>
          </Pressable>
        </View>

        {/* Public Toggle */}
        <View style={styles.toggleContainer}>
          <Text style={styles.toggleLabel}>Công khai</Text>
          <Pressable 
            style={[
              styles.toggle,
              isPublic ? styles.toggleActive : styles.toggleInactive
            ]}
            onPress={() => setIsPublic(!isPublic)}
          >
            <View style={[
              styles.toggleHandle,
              isPublic ? styles.toggleHandleActive : styles.toggleHandleInactive
            ]} />
          </Pressable>
        </View>
      </ScrollView>

      {/* Manager Selection Modal */}
      <Modal
        visible={showManagerPicker}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Chọn người quản lý</Text>
              <Pressable 
                onPress={() => setShowManagerPicker(false)}
                style={styles.closeButton}
              >
                <Ionicons name="close" size={24} color="#000" />
              </Pressable>
            </View>
            {managers.map((manager, index) => (
              <Pressable
                key={index}
                style={styles.managerOption}
                onPress={() => {
                  setSelectedManager(manager);
                  setShowManagerPicker(false);
                }}
              >
                <Text style={[
                  styles.managerOptionText,
                  selectedManager === manager && styles.selectedManagerText
                ]}>
                  {manager}
                </Text>
                {selectedManager === manager && (
                  <Ionicons name="checkmark" size={24} color="#007AFF" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>

      {/* Location Map Modal */}
      <Modal
        visible={showMap}
        animationType="slide"
        onRequestClose={() => setShowMap(false)}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              {isPinning ? 'Chạm vào bản đồ để chọn vị trí' : 'Chọn vị trí'}
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
                    setLocation(e.nativeEvent.coordinate);
                    setIsPinning(false);
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
                    setLocation(e.nativeEvent.coordinate);
                  }}
                />
              </MapView>

              <Pressable 
                style={[
                  styles.pinButton,
                  isPinning && styles.pinButtonActive
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
              setIsPinning(false);
              setShowMap(false);
            }}
          >
            <Text style={styles.confirmButtonText}>Xác nhận vị trí</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 60,
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
});
