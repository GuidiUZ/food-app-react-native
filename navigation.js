import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./src/views/HomeScreen";
import RestaurantScreen from "./src/views/RestaurantScreen";
import CartScreen from "./src/views/CartScreen";
import OrderPrepairingScreen from "./src/views/OrderPrepairingScreen";
import DeliveryScreen from "./src/views/DeliveryScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Restaurant" component={RestaurantScreen} />
        <Stack.Screen name="Cart" options={() => ({presentation: "modal"})} component={CartScreen} />
        <Stack.Screen name="OrderPrepairing" options={{presentation: "fullScreenModal"}} component={OrderPrepairingScreen} />
        <Stack.Screen name="Delivery" component={DeliveryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
