import "react-native-gesture-handler";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import DishDetails from "./Views/DishDetails";
import DishForm from "./Views/DishForm";
import Menu from "./Views/Menu";
import Order from "./Views/Order";
import OrderResume from "./Views/OrderResume";
import OrderStatus from "./Views/OrderStatus";

// Components
import SummaryButton from "./components/ui/SummaryButton";

// Import context State
import FirebaseState from "./context/firebase/firebaseState";
import OrderState from "./context/orders/orderState";

// Expo Fonts
import { useFonts } from "expo-font";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Roboto: require("native-base/Fonts/Roboto.ttf"),
    Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <>
      <FirebaseState>
        <OrderState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerTitleAlign: "center",
                headerStyle: {
                  backgroundColor: "#FFDA00",
                },
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
              initialRouteName="Order"
            >
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{ title: "Menu", headerRight: (props) => <SummaryButton /> }}
              />
              <Stack.Screen
                name="DishDetails"
                component={DishDetails}
                options={{ title: "Details" }}
              />
              <Stack.Screen name="DishForm" component={DishForm} options={{ title: "" }} />
              <Stack.Screen name="Order" component={Order} options={{ title: "Order" }} />
              <Stack.Screen
                name="OrderResume"
                component={OrderResume}
                options={{ title: "Confirm" }}
              />
              <Stack.Screen
                name="OrderStatus"
                component={OrderStatus}
                options={{ title: "Status" }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </OrderState>
      </FirebaseState>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
