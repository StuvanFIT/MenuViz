import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

export function LoadingFallback({text}: {text: string}){
    return (
        <View>
          <ActivityIndicator size="large" color="#06C167" />
          <Text style={styles.loadingText}>{text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
    textTransform: "uppercase"
  },
})