import { View, Text, StyleSheet, SafeAreaView, TextInput, Pressable } from 'react-native';
import React from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const colorScheme = useColorScheme();
  
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable>
          <Text style={styles.editButton}>Edit</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Chats</Text>
        <Pressable>
          <Ionicons name="create-outline" size={24} color="#007AFF" />
        </Pressable>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={16} color="#8E8E93" style={styles.searchIcon} />
          <TextInput 
            placeholder="Search"
            style={styles.searchInput}
            placeholderTextColor="#8E8E93"
          />
        </View>
      </View>

      {/* Empty State */}
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateTitle}>
          Không có tin nhắn
        </Text>
        <Text style={styles.emptyStateSubtitle}>
          Chưa có ai gửi tin nhắn cho bạn cả.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginTop: 50
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
  },
  editButton: {
    color: '#007AFF',
    fontSize: 17,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    paddingHorizontal: 8,
    height: 36,
    marginTop: 50
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 17,
    color: '#000',
    paddingVertical: 12,
    height: 50,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#8E8E93',
  },
});
