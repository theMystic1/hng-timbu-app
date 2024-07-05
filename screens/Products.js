import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { allProducts } from "../services/http";
import { SafeAreaView } from "react-native-safe-area-context";
import ProductItem from "../components/ProductItem";

function Products() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function getProducts() {
      setIsLoading(true);
      try {
        const data = await allProducts();
        setProducts(data.items);
      } catch (error) {
        console.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    getProducts();
  }, []);

  if (isLoading) return <Text>Loading...</Text>;

  // SafeAreaView;
  return (
    <SafeAreaView contentContainerStyle={styles.container}>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        keyExtractor={(item) => item.unique_id}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginTop: 20,
  },
});

export default Products;
