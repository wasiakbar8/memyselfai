import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import {
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
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
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  });
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editField, setEditField] = useState(null);
  const [newValue, setNewValue] = useState('');

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSaveChanges = () => {
    if (editField) {
      setUserInfo(prevState => ({
        ...prevState,
        [editField]: newValue,
      }));
    }
    setIsModalVisible(false);
  };

  const handleEditPress = (field) => {
    setEditField(field);
    setNewValue(userInfo[field]);
    setIsModalVisible(true);
  };

  const handlePickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setUserInfo(prevState => ({
        ...prevState,
        profilePicture: result.uri,
      }));
    }
  };

  const renderInfoItem = (title, value, field, onPress, showArrow = false) => (
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
              source={{ uri: userInfo.profilePicture }}
              style={styles.profileImage}
            />
          </View>
          <Text style={styles.profileName}>{userInfo.name}</Text>
          <Text style={styles.profileEmail}>{userInfo.email}</Text>
          
          <TouchableOpacity style={styles.changePictureButton} onPress={handlePickImage}>
            <Text style={styles.changePictureText}>Change Profile Picture</Text>
          </TouchableOpacity>
        </View>

        {/* Personal Info Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Info</Text>
          
          {renderInfoItem(
            'Name',
            userInfo.name,
            'name',
            () => handleEditPress('name')
          )}
          
          {renderInfoItem(
            'Email',
            userInfo.email,
            'email',
            () => handleEditPress('email')
          )}
          
          {renderInfoItem(
            'Password',
            userInfo.password,
            'password',
            () => handleEditPress('password')
          )}
          
          {renderInfoItem(
            'Language',
            userInfo.language,
            'language',
            () => handleEditPress('language'),
            true
          )}
          
          {renderInfoItem(
            'Time Zone',
            userInfo.timeZone,
            'timeZone',
            () => handleEditPress('timeZone'),
            true
          )}
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
          <Text style={styles.saveButtonText}>Save Changes</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal for Editing */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit {editField}</Text>
            <TextInput
              style={styles.input}
              value={newValue}
              onChangeText={setNewValue}
            />
            <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
              <Text style={styles.saveButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  cancelButton: {
    marginTop: 10,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#FF0000',
  },
});

export default ProfileScreen;
