import { useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { MenuItem } from "@/types/type";
import { Feather } from '@expo/vector-icons';
import { generateMenuItemImage } from "@/services/geminiService";


export default function MenuResultsScreen() {
    const params = useLocalSearchParams();
    const [menuItems, setMenuItems] = useState<MenuItem[]>(JSON.parse(params.menuItems as string));

    const handleItemVisualisation = async (itemId: string) => {
        console.log("ITEM PRESSED")
        const itemIndex = menuItems.findIndex( index => index.id === itemId);
        if (itemIndex === -1) return;

        const currMenuItem = menuItems[itemIndex];

        //Update Menu image status -> loading
        setMenuItems(prev => prev.map(p => p.id === itemId ? {...p, imageStatus: 'loading'} : p));

        const imageUrl = await generateMenuItemImage(currMenuItem);

        setMenuItems(prev => prev.map(p => 
            p.id === itemId 
                ? { ...p, generatedImageUrl: imageUrl || undefined, imageStatus: imageUrl ? 'success' : 'error' } 
                : p
        ));
    }

    return (
        <View style={styles.container}>
        <FlatList
            data={menuItems}
            keyExtractor={(item, index) => `${item.name}-${index}`}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
            <TouchableOpacity 
                style={styles.menuCard}
                onPress={() => handleItemVisualisation(item.id)}
                activeOpacity={0.7}
            >
                {item.generatedImageUrl ? (
                    <Image source={{ uri: item.generatedImageUrl }} style={styles.itemImage} />
                ) : (
                <View style={styles.imagePlaceholder}>
                    <Feather name="image" size={40} color="#ccc" />
                </View>
                )}
                <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={2}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                </View>
            </TouchableOpacity>
            )}
        />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  listContent: {
    padding: 16,
  },
  menuCard: {
    flex: 1,
    margin: 8,
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    overflow: 'hidden',
    maxWidth: '45%',
  },
  itemImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#E0E0E0',
  },
  imagePlaceholder: {
    width: '100%',
    height: 150,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    padding: 12,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#06C167',
  },
});