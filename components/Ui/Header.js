import { StyleSheet, Text, View } from "react-native";

function Header({ children, style }) {
  return (
    <View style={style}>
      <Text style={styles.header}>{children}</Text>
    </View>
  );
}

export default Header;

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: "bold",
  },
});
