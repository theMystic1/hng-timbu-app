import { ActivityIndicator, StyleSheet, View } from "react-native";

function Activity() {
  return (
    <View style={styles.activityIndicator}>
      <ActivityIndicator size="large" />
    </View>
  );
}

export default Activity;

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
