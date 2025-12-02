import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function HomeScreen() {
  const handleScanMenu = () => {
    console.log("Scan menu pressed");
  };

  const handleUploadMenu = () => {
    console.log("Upload menu pressed");
  };

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
            <Feather name="camera" size={24} color="#FFFFFF" />
            <Text style={styles.scanButtonText}>Scan Menu</Text>
          </View>
        </TouchableOpacity>

        {/* Upload Option */}
        <TouchableOpacity onPress={handleUploadMenu} activeOpacity={0.7}>
          <Text style={styles.uploadText}>OR UPLOAD FROM GALLERY</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#253D2C", 
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
    color: "#FFFFFF",
    letterSpacing: -0.5,
  },
  titleLine2: {
    fontSize: 40,
    fontWeight: "700",
    color: "#68BA7F", 
    letterSpacing: -0.5,
  },
  description: {
    fontSize: 16,
    color: "#CFFFDC", 
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 48,
    paddingHorizontal: 8,
  },
  scanButton: {
    backgroundColor: "#2E6F40", 
    paddingVertical: 18,
    paddingHorizontal: 48,
    borderRadius: 16,
    width: "100%",
    maxWidth: 340,
    shadowColor: "#2E6F40",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  uploadText: {
    marginTop: 24,
    fontSize: 12,
    color: "#68BA7F",
    fontWeight: "600",
    letterSpacing: 1.2,
  },
});