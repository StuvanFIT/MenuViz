import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert } from 'react-native';
import * as ImagePicker from "expo-image-picker";
import { useRouter } from 'expo-router';
import { parseMenuItemFromImage } from '@/services/geminiService';

//icons
import { Feather } from '@expo/vector-icons';

const IMAGE_PICKER_CONFIG: ImagePicker.ImagePickerOptions = {
  mediaTypes: ['images', 'videos'],
  allowsEditing: true, 
  aspect: [4, 3],
  quality: 1,
  base64: true,
}


export default function HomeScreen() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const requestPermission = async (type: string) => {
    const permissionRequest = type === 'camera'
      ? ImagePicker.requestCameraPermissionsAsync()
      : ImagePicker.requestMediaLibraryPermissionsAsync();

    const result = await permissionRequest;

    if (!result.granted) {
      const message = type === 'camera'
        ? 'Permission to access the camera is required.'
        : 'Permission to access the media library is required.';
      
      Alert.alert('Permission required', message);
      return false;
    }

    return true;
  }

  const processImage = async (imageResult: ImagePicker.ImagePickerResult) => {
    if (imageResult.canceled) return;

    try {
      setLoading(true);
      const menuItems = await parseMenuItemFromImage(imageResult.assets[0].base64);
      console.log(menuItems);


      if (menuItems.length === 0) {
        Alert.alert("Could not analyse menu image. Please try again.");
        return;
      }

      router.push({
        pathname: "/menu-results",
        params: {
          menuItems: JSON.stringify(menuItems),
          menuImage: imageResult.assets[0].uri
        }
      }); //navigate to menu results screen

    } catch (error) {
        console.error('Error processing image:', error);
        Alert.alert('Error', 'Failed to process the menu image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleImagePicker = async (source: string) => {
    console.log(`${source} pressed`);

    //request permission
    const permissionResult = requestPermission(source);
    if (!permissionResult) return;

    //launch the appropriate image picker
    const result = source === 'camera'
      ? await ImagePicker.launchCameraAsync(IMAGE_PICKER_CONFIG)
      : await ImagePicker.launchImageLibraryAsync(IMAGE_PICKER_CONFIG);

    await processImage(result);
  }

  const handleScanMenu = () => handleImagePicker("camera");
  const handleUploadMenu = () => handleImagePicker("library");
  
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Analysing and Reading menu...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.contentWrapper}>
        {/* Header Section */}
        <View style={styles.headerSection}>
          <Text style={styles.titleLine1}>Stop guessing.</Text>
          <Text style={styles.titleLine2}>Visualise.</Text>
        </View>

        {/* Description */}
        <Text style={styles.description}>
          Snap a photo of any menu and see exactly what the food looks like
          before you order.
        </Text>

        {/* Scan Menu Button */}
        <TouchableOpacity
          style={styles.scanButton}
          onPress={handleScanMenu}
          activeOpacity={0.8}
        >
          <View style={styles.buttonContent}>
            <Feather name="camera" size={24} color="#0000000" />
            <Text style={styles.scanButtonText}>Scan Menu</Text>
          </View>
        </TouchableOpacity>

        {/* Upload Option */}
        <TouchableOpacity onPress={handleUploadMenu} activeOpacity={0.7}>
          <Text style={styles.uploadText}>OR UPLOAD FROM YOUR GALLERY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  contentWrapper: {
    width: "100%",
    maxWidth: 400,
    alignItems: "center",
  },
  headerSection: {
    alignItems: "center",
    marginBottom: 24,
  },
  titleLine1: {
    fontSize: 40,
    fontWeight: "700",
    color: "#000000",
    letterSpacing: -0.5,
  },
  titleLine2: {
    fontSize: 40,
    fontWeight: "700",
    color: "#06C167",
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: "#000000",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 8,
    opacity: 0.7,
  },
  scanButton: {
    backgroundColor: "#06C167",
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 12,
    width: "100%",
    maxWidth: 340,
    shadowColor: "#06C167",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  scanButtonText: {
    color: "#000000",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  uploadText: {
    marginTop: 24,
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
    letterSpacing: 1.2,
    opacity: 0.5,
  },
});