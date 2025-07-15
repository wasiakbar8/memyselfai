import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const [userInfo, setUserInfo] = useState({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '••••••',
    language: 'English',
    timeZone: 'GMT-5',
  });

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSaveChanges = () => {
    // Handle save changes logic here
    console.log('Save changes pressed');
  };

  const renderInfoItem = (title, value, onPress, showArrow = false) => (
    <TouchableOpacity style={styles.infoItem} onPress={onPress}>
      <View style={styles.infoItemContent}>
        <Text style={styles.infoItemTitle}>{title}</Text>
        <Text style={styles.infoItemValue}>{value}</Text>
      </View>
      {showArrow ? (
        <Ionicons name="chevron-forward" size={20} color="#666" />
      ) : (
        <Ionicons name="pencil" size={20} color="#666" />
      )}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <Ionicons name="close" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Picture Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{
                uri: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80'
              }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{userInfo.name}</Text>
          <Text style={styles.profileEmail}>{userInfo.email}</Text>
          
          <TouchableOpacity style={styles.changePictureButton}>
            <Text style={styles.changePictureText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          
          {renderInfoItem(
            'Name',
            userInfo.name,
            () => console.log('Edit name pressed')
          )}
          
          {renderInfoItem(
            'Email',
            userInfo.email,
            () => console.log('Edit email pressed')
          )}
          
          {renderInfoItem(
            'Password',
            userInfo.password,
            () => console.log('Edit password pressed')
          )}
          
          {renderInfoItem(
            'Language',
            userInfo.language,
            () => console.log('Edit language pressed'),
            true
          )}
          
          {renderInfoItem(
            'Time Zone',
            userInfo.timeZone,
            () => console.log('Edit time zone pressed'),
            true
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#7DD3C0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  changePictureButton: {
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  changePictureText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoItemContent: {
    flex: 1,
  },
  infoItemTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 4,
  },
  infoItemValue: {
    fontSize: 14,
    color: '#666',
  },
  saveButton: {
    backgroundColor: '#FFD700',
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginVertical: 32,
    marginHorizontal: 16,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
});

export default ProfileScreen;