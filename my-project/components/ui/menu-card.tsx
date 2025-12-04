import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Feather } from '@expo/vector-icons';
import { MenuItem } from "@/types/type";

export function MenuCard({ item, onVisualise }: { item: MenuItem; onVisualise: (id: string) => void }) {
  const renderImageSection = () => {
    if (item.imageStatus === 'loading') {
      return (
        <View style={styles.imagePlaceholder}>
          <ActivityIndicator size="large" color="#06C167" />
          <Text style={styles.loadingText}>Dreaming up dish...</Text>
        </View>
      );
    }

    if (item.generatedImageUrl) {
      return (
        <Image 
          source={{ uri: item.generatedImageUrl }} 
          style={styles.itemImage}
          resizeMode="cover"
        />
      );
    }

    return (
      <View style={styles.imagePlaceholder}>
        {/* Visualize Button */}
        {!item.generatedImageUrl && item.imageStatus === 'idle' && (
          <TouchableOpacity
            style={styles.visualizeButton}
            onPress={() => onVisualise(item.id)}
            activeOpacity={0.8}
          >
            <Feather name="eye" size={16} color="#000000" />
            <Text style={styles.visualizeButtonText}>Visualise Dish</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderTags = () => {
    if (!item.dietaryTags || item.dietaryTags.length === 0) return null;

    return (
      <View style={styles.tagsContainer}>
        {item.dietaryTags.slice(0, 3).map((tag, index) => (
          <View key={index} style={styles.tag}>
            <Text style={styles.tagText}>{tag}</Text>
          </View>
        ))}
        {item.dietaryTags.length > 3 && (
          <View style={styles.tag}>
            <Text style={styles.tagText}>+{item.dietaryTags.length - 3}</Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.menuCard}>
      {/* Image Section */}
      {renderImageSection()}

      {/* Content Section */}
      <View style={styles.itemContent}>
        {/* Item Info */}
        <View style={styles.itemInfo}>
          <Text style={styles.itemName} numberOfLines={2}>
            {item.name}
          </Text>
          {item.description && (
            <Text style={styles.itemDescription} numberOfLines={2}>
              {item.description}
            </Text>
          )}
          <Text style={styles.itemPrice}>{item.price}</Text>
        </View>

        {/* Tags */}
        {renderTags()}


        {/* Error State */}
        {item.imageStatus === 'error' && (
          <TouchableOpacity
            style={styles.retryButton}
            onPress={() => onVisualise(item.id)}
            activeOpacity={0.8}
          >
            <Feather name="refresh-cw" size={16} color="#06C167" />
            <Text style={styles.retryButtonText}>Try Again</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  itemImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#F0F0F0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  itemContent: {
    padding: 16,
  },
  itemInfo: {
    marginBottom: 12,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    marginBottom: 6,
  },
  itemDescription: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
    marginBottom: 8,
  },
  itemPrice: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 6,
  },
  tag: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#666666',
    fontWeight: '500',
  },
  visualizeButton: {
    backgroundColor: '#06C167',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    shadowColor: "#06C167",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    gap: 8,
  },
  visualizeButtonText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  retryButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#06C167',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    gap: 8,
  },
  retryButtonText: {
    color: '#06C167',
    fontSize: 16,
    fontWeight: '700',
  },
});