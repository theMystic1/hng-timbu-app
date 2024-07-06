import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { useCart } from "../contexts/CartContext";
import CartItem from "../components/CartItem";
import Button from "../components/Ui/Button";
import { formatCurrency } from "../services/helpers";
import { useState } from "react";
import CheckoutModal from "../components/CheckoutModal";
import { Colors } from "../services/styles";
import { useNavigation } from "@react-navigation/native";

function CartScreen({ navigation }) {
  const { cart, totalPrice } = useCart();

  const [isVisible, setIsVisible] = useState(false);

  function checkout() {
    setIsVisible(true);
  }

  const { navigate } = useNavigation();
  function handleNav() {
    navigate("Products");
  }

  if (!cart?.length)
    return (
      <View style={styles.empty}>
        <Text style={styles.centerTxt}>Cart is empty</Text>
        <Pressable onPress={handleNav}>
          <Text style={styles.centerBtn}>Add Items </Text>
        </Pressable>
      </View>
    );
  return (
    <ScrollView style={styles.container}>
      {/* <FlatList
        data={cart}
        renderItem={({ item }) => <CartItem cartItem={item} />}
        keyExtractor={(item) => item.unique_id}
      /> */}

      {cart.map((cartItem) => (
        <CartItem cartItem={cartItem} key={cartItem.unique_id} />
      ))}

      <CheckoutModal
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        navigation={navigation}
      />
      <View style={styles.flex}>
        <Text style={styles.text}>Total</Text>
        <Text style={styles.header}>{formatCurrency(totalPrice)}</Text>
      </View>

      <Button onPress={checkout}>Checkout</Button>
    </ScrollView>
  );
}

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },

  btn: {
    height: 80,
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
  },
  text: {
    fontSize: 20,
    color: "#979797",
  },
  empty: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    gap: 8,
  },

  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 20,
    marginBottom: 10,
  },

  centerTxt: {
    textAlign: "center",
  },
  centerBtn: {
    color: Colors.primary500,
    fontWeight: "700",
  },
});
