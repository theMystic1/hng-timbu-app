import { Pressable, StyleSheet, Text, View } from "react-native";
import { Colors } from "../../services/styles";

function Button({ children, style, textStyle, onPress }) {
  return (
    <View style={[styles.button, style]}>
      <Pressable onPress={onPress} style={styles.btn}>
        <Text style={[styles.text, textStyle]}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    flex: 1,
    height: 50,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.primary500,
    justifyContent: "center",
    alignItems: "center",
  },

  btn: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
