import React, { useContext } from "react";
import { Button, Text } from "native-base";
import { useNavigation } from "@react-navigation/native";
import globalStyles from "../../styles/global";

import OrderContext from "../../context/orders/orderContext";

const SummaryButton = () => {
  const navigation = useNavigation();

  const { order } = useContext(OrderContext);

  if (order.length === 0) return null;

  return (
    <Button onPress={() => navigation.navigate("OrderResume")} style={globalStyles.button}>
      <Text style={globalStyles.buttonText}>Order</Text>
    </Button>
  );
};

export default SummaryButton;
