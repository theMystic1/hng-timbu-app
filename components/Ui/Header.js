import { StyleSheet, Text, View } from "react-native";

function Header({ children, style, childrenStyle }) {
  return (
    <View style={style}>
      <Text style={[styles.header, childrenStyle]}>{children}</Text>
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
