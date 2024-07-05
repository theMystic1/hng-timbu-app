import "react-native-gesture-handler";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Products from "./screens/Products";
import Product from "./screens/Product";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CartScreen from "./screens/CartScreen";
import { Colors } from "./services/styles";
import { ContextProvider } from "./contexts/CartContext";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      initialRouteName="Products"
      screenOptions={{
        drawerActiveTintColor: Colors.primary500,
        drawerActiveBackgroundColor: Colors.primary100,
      }}
    >
      <Drawer.Screen name="Products" component={Products} />
      <Drawer.Screen name="Cart" component={CartScreen} />
    </Drawer.Navigator>
  );
}

export default function App() {
  return (
    <ContextProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="All"
            component={DrawerNavigator}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="Product" component={Product} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast config={toastConfig} />
    </ContextProvider>
  );
}

const toastConfig = {
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: "green" }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.primary500,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: "red" }}
      text1Style={{
        fontSize: 18,
        fontWeight: "bold",
        color: Colors.error500,
      }}
      text2Style={{
        fontSize: 16,
      }}
    />
  ),
};
