import { Alert, Image, StyleSheet, Text, View } from "react-native";

import Button from "./Ui/Button";
import { Colors } from "../services/styles";
import { formatCurrency } from "../services/helpers";
import { useNavigation } from "@react-navigation/native";
import { useCart } from "../contexts/CartContext";
import Toast from "react-native-toast-message";

function ProductItem({ product }) {
  const navigation = useNavigation();
  const { addToCart, cart, removeFromCart } = useCart();

  function viewProduct() {
    navigation.navigate("Product", { product });
  }

  const isInCart = cart.some((crt) => crt.unique_id === product.unique_id);

  function handleRemoveItem() {
    removeFromCart(product.unique_id);
    Toast.show({
      type: "error",
      text1: "Item Removed",
      text2: `${product.name.toUpperCase()} removed from cart `,
    });
  }

  function handleAddToCart() {
    if (!isInCart) {
      addToCart(product);

      Toast.show({
        type: "success",
        text1: "Item Added",
        text2: `${product.name.toUpperCase()} successfully added to cart `,
      });
    } else {
      Alert.alert(
        "Product already added",
        ` ${product.name} is already in the cart`,
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Remove item",
            onPress: () => handleRemoveItem(),
          },
        ],
        { cancelable: true }
      );
    }
  }

  return (
    <View style={styles.product}>
      <Image
        source={{
          uri: `https://api.timbu.cloud/images/${product.photos[0].url}`,
        }}
        style={styles.image}
      />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>
        {formatCurrency(product.current_price[0].GBP[0])}
      </Text>
      <View style={styles.buttonContainer}>
        <Button
          style={isInCart ? styles.inCart : styles.btnStyle}
          textStyle={isInCart ? styles.inCartTxt : styles.btnTxt}
          onPress={handleAddToCart}
        >
          {isInCart ? "Added" : "Add"}
        </Button>
        <Button onPress={viewProduct}>View</Button>
      </View>
    </View>
  );
}

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    margin: 16,
    flex: 1,
    // alignItems: "center",
    marginBottom: 24,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 16,
    textTransform: "uppercase",
    color: Colors.primary800,
    // textAlign: "center",
  },
  price: {
    fontSize: 16,
    fontWeight: "bold",
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: 2,
    color: Colors.primary500,
  },
  image: {
    height: 300,
    width: "100%",
    borderRadius: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "",
    marginBottom: 8,
    gap: 20,
  },

  btnStyle: {
    backgroundColor: Colors.primary100,
  },
  btnTxt: {
    color: Colors.primary500,
    // fontWeight: "bold",
  },

  inCart: {
    backgroundColor: "#979797",
  },
  inCartTxt: {
    color: "#000",
  },
});
