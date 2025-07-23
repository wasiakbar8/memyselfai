import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import { useRouter } from 'expo-router';
import { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Modal,
  SafeAreaView,
  ScrollView,
  Share,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import CustomDrawer from './component/CustomDrawer'; // Import your custom drawer

const gotoprofile = () => {
  const router = useRouter();
  router.push('./profile');
};

const { width, height } = Dimensions.get('window');

const VaultApp = () => {
  const [currentScreen, setCurrentScreen] = useState('main');
  const [selectedCategory, setSelectedCategory] = useState('All Docs');
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: 'Passport Copy',
      type: 'PDF',
      category: 'Legal',
      updatedTime: '3 weeks ago',
      size: '2.4 MB',
      content: null,
      encrypted: true,
      description: 'Scanned copy of my international passport'
    },
    {
      id: 2,
      name: 'Insurance Policy',
      type: 'PDF',
      category: 'Medical',
      updatedTime: '5 months ago',
      size: '1.8 MB',
      content: null,
      encrypted: true,
      description: 'Health insurance policy for 2025'
    },
    {
      id: 3,
      name: 'Diploma Certificate',
      type: 'PDF',
      category: 'Legal',
      updatedTime: '1 week ago',
      size: '3.2 MB',
      content: null,
      encrypted: true,
      description: 'University degree certificate'
    },
    {
      id: 4,
      name: 'Medical Report',
      type: 'PDF',
      category: 'Medical',
      updatedTime: '2 weeks ago',
      size: '1.5 MB',
      content: null,
      encrypted: true,
      description: 'Annual medical checkup results'
    },
    {
      id: 5,
      name: 'Resume 2025',
      type: 'DOC',
      category: 'Bank',
      updatedTime: '2 months ago',
      size: '956 KB',
      content: null,
      encrypted: true,
      description: 'Updated resume for job applications'
    },
    {
      id: 6,
      name: 'Social Security Card',
      type: 'PDF',
      category: 'Legal',
      updatedTime: '1 month ago',
      size: '1.2 MB',
      content: null,
      encrypted: true,
      description: 'Social security card scan'
    }
  ]);

  const [selectedDocument, setSelectedDocument] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFileName, setUploadingFileName] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const descriptionInputRef = useRef(null);

  const categories = [
    { name: 'All Docs', icon: 'folder', color: '#FDE047' },
    { name: 'Bank', icon: 'business', color: '#9CA3AF' },
    { name: 'Medical', icon: 'medical', color: '#9CA3AF' },
    { name: 'Legal', icon: 'scale', color: '#9CA3AF' }
  ];

  const handleMenuPress = () => {
    setIsDrawerVisible(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerVisible(false);
  };

  const getFileTypeColor = (type) => {
    switch (type) {
      case 'PDF': return { bg: '#FEE2E2', text: '#DC2626' };
      case 'DOC': return { bg: '#DBEAFE', text: '#2563EB' };
      case 'IMG': return { bg: '#D1FAE5', text: '#059669' };
      default: return { bg: '#F3F4F6', text: '#6B7280' };
    }
  };

  const getFilteredDocuments = () => {
    if (selectedCategory === 'All Docs') {
      return documents;
    }
    return documents.filter(doc => doc.category === selectedCategory);
  };

  const handleCategoryPress = (categoryName) => {
    setSelectedCategory(categoryName);
  };

  const handleFileUpload = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
      });

      if (!result.canceled && result.assets[0]) {
        const file = result.assets[0];
        setUploadingFileName(file.name);
        setUploading(true);
        setUploadProgress(0);
        setCurrentScreen('upload-progress');

        const interval = setInterval(() => {
          setUploadProgress(prev => {
            if (prev >= 100) {
              clearInterval(interval);
              const newDoc = {
                id: documents.length + 1,
                name: file.name.replace(/\.[^/.]+$/, ""),
                type: file.name.split('.').pop().toUpperCase(),
                category: selectedCategory === 'All Docs' ? 'Legal' : selectedCategory,
                updatedTime: 'just now',
                size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
                content: file,
                encrypted: true,
                description: ''
              };

              setDocuments(prev => [newDoc, ...prev]);
              setTimeout(() => {
                setUploading(false);
                setCurrentScreen('main');
                Alert.alert('Success', 'Document uploaded successfully!');
              }, 1000);
              return 100;
            }
            const newProgress = prev + Math.random() * 15;
            return newProgress;
          });
        }, 150);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to upload document');
    }
  };

  const handleDocumentClick = (doc) => {
    setSelectedDocument(doc);
    setEditedName(doc.name);
    setEditedDescription(doc.description || '');
    setCurrentScreen('document-view');
  };

  const handleEditDocument = () => {
    setEditMode(true);
    setTimeout(() => {
      descriptionInputRef.current?.focus();
    }, 100);
  };

  const handleDescriptionChange = useCallback((text) => {
    setEditedDescription(text);
  }, []);

  const handleSaveEdit = () => {
    if (editedName.trim()) {
      setDocuments(prev => prev.map(doc => 
        doc.id === selectedDocument.id 
          ? { ...doc, 
              name: editedName.trim(), 
              description: editedDescription.trim(),
              updatedTime: 'just now' }
          : doc
      ));
      setSelectedDocument(prev => ({ 
        ...prev, 
        name: editedName.trim(),
        description: editedDescription.trim()
      }));
      setEditMode(false);
      Alert.alert('Success', 'Document details updated successfully!');
    }
  };

  const handleCancelEdit = () => {
    setEditedName(selectedDocument.name);
    setEditedDescription(selectedDocument.description || '');
    setEditMode(false);
  };

  const handleDownloadDocument = async () => {
    try {
      if (selectedDocument.content) {
        await Share.share({
          title: selectedDocument.name,
          message: `Downloading ${selectedDocument.name}`,
        });
      } else {
        Alert.alert('Info', 'Document content not available for download');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download document');
    }
  };

  const handleDeleteDocument = () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setDocuments(prev => prev.filter(doc => doc.id !== selectedDocument.id));
    setShowDeleteConfirm(false);
    setCurrentScreen('main');
    Alert.alert('Success', 'Document deleted successfully!');
  };

  const cancelUpload = () => {
    setUploading(false);
    setUploadProgress(0);
    setCurrentScreen('main');
  };

  const handleViewFullDocument = () => {
    Alert.alert(
      'View Full Document',
      `Opening full ${selectedDocument?.type.toLowerCase()} document: ${selectedDocument?.name}`,
      [
        { text: 'OK', onPress: () => console.log('Opening full document') }
      ]
    );
  };

  const Header = ({ title, showBack = false, onBack }) => (
    <View style={styles.header}>
      <TouchableOpacity 
        style={styles.headerButton} 
        onPress={showBack ? onBack : handleMenuPress}
      >
        <Ionicons name={showBack ? "arrow-back" : "menu"} size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{title}</Text>
      <TouchableOpacity onPress={gotoprofile} style={styles.headerButton}>
        <Ionicons name="person-outline" size={24} color="#000" />
      </TouchableOpacity>
    </View>
  );

  const MainScreen = () => {
    const filteredDocs = getFilteredDocuments();
    
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Header title="Vault" />
        
        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category, index) => {
              const isSelected = selectedCategory === category.name;
              return (
                <TouchableOpacity 
                  key={index} 
                  style={styles.categoryItem}
                  onPress={() => handleCategoryPress(category.name)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: isSelected ? '#FDE047' : category.color }]}>
                    <Ionicons name={category.icon} size={32} color="#fff" />
                  </View>
                  <Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
                    {category.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          <View style={styles.statusBanner}>
            <View style={styles.statusLeft}>
              <View style={styles.statusIndicator} />
              <View>
                <Text style={styles.statusTitle}>Vault Secured</Text>
                <Text style={styles.statusSubtitle}>Last access: 3 hours ago</Text>
              </View>
            </View>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => setCurrentScreen('upload')}
            >
              <Ionicons name="add" size={16} color="#2563EB" />
              <Text style={styles.addButtonText}>Add Document</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.categoryTitle}>
            {selectedCategory} ({filteredDocs.length})
          </Text>

          <View style={styles.documentsGrid}>
            {filteredDocs.map((doc) => {
              const typeColors = getFileTypeColor(doc.type);
              return (
                <TouchableOpacity 
                  key={doc.id}
                  style={styles.documentCard}
                  onPress={() => handleDocumentClick(doc)}
                >
                  <View style={styles.documentHeader}>
                    <Ionicons name="document-text" size={24} color="#9CA3AF" />
                    <View style={[styles.fileTypeTag, { backgroundColor: typeColors.bg }]}>
                      <Text style={[styles.fileTypeText, { color: typeColors.text }]}>
                        {doc.type}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.documentTitle} numberOfLines={2}>{doc.name}</Text>
                  <Text style={styles.documentTime}>Updated {doc.updatedTime}</Text>
                  <View style={styles.encryptedBadge}>
                    <View style={styles.encryptedDot} />
                    <Text style={styles.encryptedText}>REQUIRES UNLOCK REASON</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>

          {filteredDocs.length === 0 && (
            <View style={styles.emptyState}>
              <Ionicons name="folder-open" size={48} color="#9CA3AF" />
              <Text style={styles.emptyStateText}>No documents in {selectedCategory}</Text>
              <TouchableOpacity 
                style={styles.addDocumentButton}
                onPress={() => setCurrentScreen('upload')}
              >
                <Text style={styles.addDocumentButtonText}>Add Document</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  };

  const DocumentViewScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header 
        title="Vault" 
        showBack={true} 
        onBack={() => setCurrentScreen('main')} 
      />
      
      <ScrollView 
        style={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.breadcrumb}>
          <Text style={styles.breadcrumbText}>Vault / {selectedDocument?.name}</Text>
        </View>

        <View style={styles.documentViewHeader}>
          {editMode ? (
            <View style={styles.editContainer}>
              <TextInput
                style={styles.editInput}
                value={editedName}
                onChangeText={setEditedName}
                placeholder="Document name"
                autoFocus
              />
              <TextInput
                ref={descriptionInputRef}
                style={[styles.editInput, styles.descriptionInput]}
                value={editedDescription}
                onChangeText={handleDescriptionChange}
                placeholder="Document description"
                multiline
                numberOfLines={4}
                autoCapitalize="sentences"
                returnKeyType="default"
                blurOnSubmit={false}
                keyboardType="default"
                onFocus={() => console.log('Description input focused')}
                onBlur={() => console.log('Description input blurred')}
                onSubmitEditing={() => console.log('Submit pressed')}
              />
              <View style={styles.editButtons}>
                <TouchableOpacity style={styles.saveButton} onPress={handleSaveEdit}>
                  <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text style={styles.documentViewTitle}>{selectedDocument?.name}</Text>
              <Text style={styles.encryptedLabel}>Encrypted</Text>
              <Text style={styles.documentDescription}>
                {selectedDocument?.description || 'No description provided'}
              </Text>
            </>
          )}
        </View>

        {!editMode && (
          <View style={styles.documentActions}>
            <TouchableOpacity style={styles.actionButtonPrimary} onPress={handleEditDocument}>
              <Ionicons name="create" size={16} color="#000" />
              <Text style={styles.actionButtonPrimaryText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonSecondary} onPress={handleDownloadDocument}>
              <Ionicons name="download" size={16} color="#2563EB" />
              <Text style={styles.actionButtonSecondaryText}>Download</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButtonDanger} onPress={handleDeleteDocument}>
              <Ionicons name="trash" size={16} color="#DC2626" />
              <Text style={styles.actionButtonDangerText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.documentInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Size:</Text>
            <Text style={styles.infoValue}>{selectedDocument?.size}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Type:</Text>
            <Text style={styles.infoValue}>{selectedDocument?.type}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Category:</Text>
            <Text style={styles.infoValue}>{selectedDocument?.category}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Last Modified:</Text>
            <Text style={styles.infoValue}>{selectedDocument?.updatedTime}</Text>
          </View>
        </View>

        <View style={styles.documentPreview}>
          <Text style={styles.documentPreviewTitle}>Document Preview</Text>
          {selectedDocument?.type === 'PDF' && (
            <TouchableOpacity 
              style={styles.pdfPreview} 
              onPress={handleViewFullDocument}
              activeOpacity={0.7}
            >
              <View style={styles.pdfPage}>
                <Ionicons name="document-text" size={48} color="#9CA3AF" />
                <Text style={styles.previewText}>PDF Page 1 Preview</Text>
                {[...Array(3)].map((_, i) => (
                  <View 
                    key={i} 
                    style={[styles.previewLine, { width: `${Math.random() * 30 + 60}%` }]}
                  />
                ))}
              </View>
            </TouchableOpacity>
          )}
          {selectedDocument?.type === 'DOC' && (
            <TouchableOpacity 
              style={styles.docPreview} 
              onPress={handleViewFullDocument}
              activeOpacity={0.7}
            >
              <Text style={styles.previewText}>
                This is a preview of the document content. Lorem ipsum dolor sit amet, 
                consectetur adipiscing elit. Sed do eiusmod tempor incididunt...
              </Text>
            </TouchableOpacity>
          )}
          {selectedDocument?.type === 'IMG' && (
            <TouchableOpacity 
              style={styles.imgPreview} 
              onPress={handleViewFullDocument}
              activeOpacity={0.7}
            >
              <View style={styles.imagePlaceholder}>
                <Ionicons name="image" size={48} color="#9CA3AF" />
                <Text style={styles.previewText}>Image Preview</Text>
              </View>
            </TouchableOpacity>
          )}
          {selectedDocument?.type !== 'PDF' && selectedDocument?.type !== 'DOC' && selectedDocument?.type !== 'IMG' && (
            <TouchableOpacity 
              style={styles.defaultPreview} 
              onPress={handleViewFullDocument}
              activeOpacity={0.7}
            >
              <Text style={styles.previewText}>Preview not available for this file type</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity 
            style={styles.viewFullButton} 
            onPress={handleViewFullDocument}
          >
            <Text style={styles.viewFullButtonText}>View Full Document</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal visible={showDeleteConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.deleteModal}>
            <Ionicons name="warning" size={48} color="#DC2626" style={styles.deleteIcon} />
            <Text style={styles.deleteTitle}>Delete Document</Text>
            <Text style={styles.deleteSubtitle}>
              Are you sure you want to delete "{selectedDocument?.name}"? This action cannot be undone.
            </Text>
            <View style={styles.deleteButtons}>
              <TouchableOpacity 
                style={styles.deleteConfirmButton} 
                onPress={confirmDelete}
              >
                <Text style={styles.deleteConfirmText}>Delete</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteCancelButton} 
                onPress={() => setShowDeleteConfirm(false)}
              >
                <Text style={styles.deleteCancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );

  const UploadScreen = () => (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Header 
        title="Upload Documents" 
        showBack={true} 
        onBack={() => setCurrentScreen('main')} 
      />
      
      <View style={styles.uploadContainer}>
        <Text style={styles.categorySelectionTitle}>Select Category</Text>
        <View style={styles.categorySelection}>
          {categories.slice(1).map((category, index) => (
            <TouchableOpacity 
              key={index}
              style={[ 
                styles.categoryButton, 
                selectedCategory === category.name && styles.categoryButtonSelected 
              ]}
              onPress={() => setSelectedCategory(category.name)}
            >
              <Text 
                style={[
                  styles.categoryButtonText, 
                  selectedCategory === category.name && styles.categoryButtonTextSelected
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.uploadArea} onPress={handleFileUpload}>
          <Ionicons name="cloud-upload" size={48} color="#9CA3AF" />
          <Text style={styles.uploadTitle}>Drag and drop files here</Text>
          <Text style={styles.uploadOr}>or</Text>
          <View style={styles.browseButton}>
            <Text style={styles.browseButtonText}>Browse Files</Text>
          </View>
          <Text style={styles.supportedFiles}>
            Supported file types: .jpg, .png, .svg, .pdf, .docx
          </Text>
        </TouchableOpacity>

        <Text style={styles.encryptionNote}>Files are end-to-end encrypted.</Text>
        
        <TouchableOpacity 
          style={styles.uploadToVaultButton}
          onPress={() => setCurrentScreen('main')}
        >
          <Text style={styles.uploadToVaultText}>Upload to Vault</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  const UploadProgressModal = () => (
    <Modal visible={uploading} transparent animationType="fade">
      <View style={styles.modalOverlay}>
        <View style={styles.progressModal}>
          {uploadProgress < 100 ? (
            <>
              <Text style={styles.progressTitle}>Uploading</Text>
              <Text style={styles.progressSubtitle}>
                Uploading '{uploadingFileName}' {Math.round(uploadProgress)}%
              </Text>
              <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${uploadProgress}%` }]} />
              </View>
              <TouchableOpacity onPress={cancelUpload}>
                <Text style={styles.cancelText}>Cancel Upload</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Ionicons name="checkmark-circle" size={64} color="#10B981" />
              <Text style={styles.successTitle}>Upload Complete!</Text>
              <Text style={styles.successSubtitle}>
                '{uploadingFileName}' has been securely stored in your vault.
              </Text>
            </>
          )}
        </View>
      </View>
    </Modal>
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'main': return <MainScreen />;
      case 'document-view': return <DocumentViewScreen />;
      case 'upload': return <UploadScreen />;
      default: return <MainScreen />;
    }
  };

  return (
    <>
      {renderScreen()}
      <UploadProgressModal />
      <CustomDrawer 
        isVisible={isDrawerVisible}
        onClose={handleDrawerClose}
        activeScreen="vault"
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  categoriesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  categoryItem: {
    alignItems: 'center',
    flex: 1,
  },
  categoryIcon: {
    width: 64,
    height: 64,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  categoryText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  categoryTextSelected: {
    color: '#000',
    fontWeight: '600',
  },
  statusBanner: {
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FDE68A',
    borderRadius: 12,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusIndicator: {
    width: 24,
    height: 24,
    backgroundColor: '#FDE047',
    borderRadius: 12,
    marginRight: 8,
  },
  statusTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  statusSubtitle: {
    fontSize: 12,
    color: '#6B7280',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 12,
    color: '#2563EB',
    marginLeft: 4,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  documentsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  documentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: (width - 48) / 2,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  documentHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  fileTypeTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  fileTypeText: {
    fontSize: 10,
    fontWeight: '500',
  },
  documentTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
    marginBottom: 4,
    minHeight: 36,
  },
  documentTime: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  encryptedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  encryptedDot: {
    width: 6,
    height: 6,
    backgroundColor: '#FDE047',
    borderRadius: 3,
    marginRight: 4,
  },
  encryptedText: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  emptyState: {
    alignItems: 'center',
    padding: 48,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#6B7280',
    marginVertical: 16,
  },
  addDocumentButton: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  addDocumentButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  breadcrumb: {
    marginBottom: 16,
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#6B7280',
  },
  documentViewHeader: {
    marginBottom: 24,
  },
  documentViewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 4,
  },
  encryptedLabel: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  documentDescription: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
    marginBottom: 8,
  },
  editContainer: {
    marginBottom: 16,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 12,
  },
  descriptionInput: {
    minHeight: 100,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  editButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  cancelButton: {
    backgroundColor: '#6B7280',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 6,
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  documentActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  actionButtonPrimary: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonPrimaryText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#000',
  },
  actionButtonSecondary: {
    backgroundColor: '#EBF4FF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonSecondaryText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#2563EB',
  },
  actionButtonDanger: {
    backgroundColor: '#FEE2E2',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonDangerText: {
    marginLeft: 8,
    fontWeight: '500',
    color: '#DC2626',
  },
  documentInfo: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#000',
    fontWeight: '400',
  },
  documentPreview: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 24,
  },
  documentPreviewTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
  },
  pdfPreview: {
    alignItems: 'center',
  },
  pdfPage: {
    width: '100%',
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },
  docPreview: {
    width: '100%',
  },
  imgPreview: {
    alignItems: 'center',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  defaultPreview: {
    alignItems: 'center',
  },
  previewText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 12,
  },
  previewLine: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    marginBottom: 8,
  },
  viewFullButton: {
    backgroundColor: '#2563EB',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  viewFullButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  uploadContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  categorySelectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  categorySelection: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    transform: [{ scale: 1 }],
  },
  categoryButtonSelected: {
    backgroundColor: '#FDE047',
    borderColor: '#FBBF24',
    transform: [{ scale: 1.05 }],
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  categoryButtonTextSelected: {
    color: '#000',
    fontWeight: '600',
  },
  uploadArea: {
    borderWidth: 2,
    borderColor: '#FDE68A',
    borderStyle: 'dashed',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    marginBottom: 24,
  },
  uploadTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop: 16,
    marginBottom: 8,
  },
  uploadOr: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  browseButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#000',
  },
  supportedFiles: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  encryptionNote: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
  },
  uploadToVaultButton: {
    backgroundColor: '#FDE047',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 8,
  },
  uploadToVaultText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteModal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    width: width - 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  deleteIcon: {
    marginBottom: 16,
  },
  deleteTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  deleteSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  deleteButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
    justifyContent: 'center',
  },
  deleteConfirmButton: {
    flex: 1,
    backgroundColor: '#DC2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    shadowColor: '#DC2626',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  deleteConfirmText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  deleteCancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  deleteCancelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  progressModal: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 32,
    alignItems: 'center',
    marginHorizontal: 16,
    width: width - 32,
  },
  progressTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  progressSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    marginBottom: 24,
  },
  progressBar: {
    height: 12,
    backgroundColor: '#FDE047',
    borderRadius: 6,
  },
  cancelText: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'underline',
  },
  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export default VaultApp;