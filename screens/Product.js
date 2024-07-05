import { Alert, Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "../services/styles";
import { formatCurrency } from "../services/helpers";
import Button from "../components/Ui/Button";
import { useRoute } from "@react-navigation/native";
import Header from "../components/Ui/Header";
import { useCart } from "../contexts/CartContext";
import Toast from "react-native-toast-message";

function Product() {
  const route = useRoute();
  const { product } = route.params;

  const { addToCart, cart, removeFromCart } = useCart();

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
          style={isInCart ? styles.inCart : null}
          textStyle={isInCart ? styles.inCartTxt : null}
          onPress={handleAddToCart}
        >
          {isInCart ? "Added" : "Add"}
        </Button>
      </View>
      <Header>Description:</Header>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
}

export default Product;

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
    fontWeight: 400,
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
  description: {
    marginVertical: 16,
    fontSize: 18,
    lineHeight: 24,
  },

  inCart: {
    backgroundColor: "#979797",
  },
  inCartTxt: {
    color: "#000",
  },
});
