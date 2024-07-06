import { Image, Modal, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../contexts/CartContext";
import Header from "./Ui/Header";
import { formatCurrency } from "../services/helpers";
import Button from "./Ui/Button";
import { Colors } from "../services/styles";

function CheckoutModal({ isVisible, setIsVisible, navigation }) {
  const { cart, totalPrice, clearCart } = useCart();

  function handleCheckout() {
    setIsVisible(false);
    clearCart();
    navigation.navigate("Products");
  }

  const cartItem = cart[0];
  return (
    <Modal animationType="slide" visible={isVisible}>
      <ScrollView style={style.container}>
        <Image
          source={require("../assets/checkout/icon-order-confirmation.svg")}
          style={style.image}
        />

        <Header style={style.headerBig}>THANK YOU FOR YOUR ORDER</Header>

        <Text style={style.text2}>You will receive an email shortly</Text>
        <View style={style.flexCont}>
          <View style={style.flex}>
            <Image
              source={{
                uri: `https://api.timbu.cloud/images/${cartItem.photos[0].url}`,
              }}
              style={style.imagee}
            />
            <View>
              <Header style={style.header}>{cartItem.name}</Header>
            </View>
            <Text style={style.text}>
              {" "}
              {formatCurrency(cartItem.current_price[0].GBP[0])}
            </Text>
          </View>
          {cart.length > 1 ? (
            <View style={style.moreItem}>
              <Text style={style.text}>
                and {cart.length - 1} other item(s)
              </Text>
            </View>
          ) : null}
        </View>
        <View style={style.headerDark}>
          <Header style={style.totalTxt}>Grand Total</Header>
          <Header style={style.total}>{formatCurrency(totalPrice)}</Header>
        </View>
        <Button onPress={handleCheckout}>Home</Button>
      </ScrollView>
    </Modal>
  );
}

export default CheckoutModal;

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },

  text2: {
    fontSize: 24,
    marginVertical: 16,
    color: "#979797",
  },

  image: {
    height: 60,
    width: 60,
    marginBottom: 18,
  },

  flexCont: {
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: "#f1f1f1",
    padding: 20,
  },

  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingHorizontal: 20,
    marginBottom: 18,
  },

  btn: {
    color: "#d87d4a",
    fontSize: 18,
  },

  imagee: {
    width: 40,
    height: 40,
    borderRadius: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    borderRadius: 4,
  },
  btnRem: {
    backgroundColor: "#f1f1f1",
    height: 40,
    shadowOpacity: 0.2,
    elevation: 3,
  },

  nextFlex: {
    flexDirection: "row",
    gap: 2,
    alignItems: "center",
  },
  header: {
    fontSize: 20,
    fontWeight: "600",
    width: 180,
  },
  text: {
    fontSize: 16,
    color: "#979797",
  },

  moreItem: {
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#979797",
    borderTopWidth: 1,
    paddingVertical: 12,
  },

  totalTxt: {
    color: "#979797",
    fontWeight: "400",
  },
  total: {
    color: "#fff",
  },

  headerDark: {
    backgroundColor: Colors.error100,
    padding: 20,
    borderBottomRightRadius: 6,
    borderBottomLeftRadius: 6,
    marginBottom: 16,
  },
  headerBig: {
    fontSize: 40,
  },
});
