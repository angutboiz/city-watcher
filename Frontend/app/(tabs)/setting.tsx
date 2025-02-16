import { View, Text, StyleSheet, SafeAreaView, Image, Pressable, Modal } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

const SettingItem = ({ title, textColor = '#000', onPress }: { title: string, textColor?: string, onPress?: () => void }) => (
  <Pressable style={styles.settingItem} onPress={onPress}>
    <Text style={[styles.settingText, { color: textColor }]}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#C7C7CC" />
  </Pressable>
);

export default function SettingScreen() {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Cài đặt</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image 
            source={{ uri: 'https://via.placeholder.com/60' }}
            style={styles.avatar}
          />
          <View style={styles.editIconContainer}>
            <Ionicons name="pencil" size={12} color="#fff" />
          </View>
        </View>
        <Text style={styles.name}>Lucas Scott</Text>
        <Text style={styles.username}>@lucasscott3</Text>
      </View>

      {/* Settings List */}
      <View style={styles.settingsList}>
        <SettingItem title="Giao diện" />
        <SettingItem title="Ngôn ngữ" />
        <SettingItem title="Quyền riêng tư và bảo mật" />
        <SettingItem 
          title="Đăng xuất" 
          textColor="#FF3B30" 
          onPress={() => setShowLogoutModal(true)}
        />
      </View>

      {/* Logout Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showLogoutModal}
        onRequestClose={() => setShowLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Đăng xuất</Text>
            <Text style={styles.modalMessage}>
              Bạn có chắc chắn muốn đăng xuất không?{'\n'}
              Bạn cần phải đăng nhập lại để sử dụng ứng dụng.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setShowLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Hủy</Text>
              </Pressable>
              <Pressable 
                style={[styles.modalButton, styles.logoutButton]}
                onPress={() => {
                  // Handle logout logic here
                  setShowLogoutModal(false);
                }}
              >
                <Text style={styles.logoutButtonText}>Đăng xuất</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E1E1E1',
  },
  editIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  username: {
    fontSize: 15,
    color: '#8E8E93',
  },
  settingsList: {
    paddingHorizontal: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#C6C6C8',
  },
  settingText: {
    fontSize: 17,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 8,
  },
  modalMessage: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 18,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  cancelButton: {
    backgroundColor: '#F2F2F2',
  },
  logoutButton: {
    backgroundColor: '#007AFF',
  },
  cancelButtonText: {
    color: '#000',
    fontSize: 17,
    fontWeight: '400',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
