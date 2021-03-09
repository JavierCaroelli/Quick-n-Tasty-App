import React, { useState, useContext, useEffect } from "react";
import { Alert, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Col,
  Container,
  Content,
  Form,
  Grid,
  Icon,
  Input,
  Text,
  Footer,
  FooterTab,
} from "native-base";
import globalStyles from "../styles/global";

import OrderContext from "../context/orders/orderContext";

const DishForm = () => {
  // Quantity State
  const [qty, setQty] = useState(1);
  const [total, setTotal] = useState(0);

  const { dish, saveOrder } = useContext(OrderContext);
  const { price } = dish;

  useEffect(() => {
    figureTotal();
  }, [qty]);

  // Add or Remove Qty
  const decreseOne = () => {
    const newQty = parseInt(qty) - 1;
    newQty >= 0 && setQty(newQty);
  };
  const increseOne = () => {
    const newQty = parseInt(qty) + 1;
    setQty(newQty);
  };

  // Figure Total
  const figureTotal = () => {
    const totalPay = price * qty;
    setTotal(totalPay);
  };

  // Redirect Function
  const navigation = useNavigation();

  // Confirm Order
  const confirmOrder = () => {
    Alert.alert("Confirm you Order?", "Be sure about the quantity of your product.", [
      { text: "cancel", style: "cancel" },
      {
        text: "Confirm",
        onPress: () => {
          // Add this order to the Final Order
          const order = {
            ...dish,
            qty,
            total,
          };
          saveOrder(order);
          // Navigate to the Order Resume
          navigation.navigate("OrderResume");
        },
      },
    ]);
  };

  return (
    <Container>
      <ImageBackground source={require("../styles/imgs/wait.jpg")} style={styles.backgImage}>
        <Content
          style={{
            marginTop: 50,
            paddingVertical: "10%",
            marginHorizontal: "2.5%",
            borderRadius: 10,
          }}
        >
          <Form style={{ backgroundColor: "#FFF" }}>
            <Text style={globalStyles.title}>Quantity</Text>
            <Grid style={{ marginBottom: 20 }}>
              <Button
                props
                style={{
                  marginLeft: 5,
                  height: 80,
                  width: "30%",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onPress={() => decreseOne()}
              >
                <Icon style={{ fontSize: 40 }} name="remove" />
              </Button>

              <Col>
                <Input
                  style={{ textAlign: "center", fontSize: 40 }}
                  value={qty.toString()}
                  keyboardType="numeric"
                  onChangeText={(quantity) => setQty(quantity)}
                />
              </Col>

              <Button
                props
                style={{
                  marginRight: 5,
                  height: 80,
                  width: "30%",
                  justifyContent: "center",
                  borderRadius: 10,
                }}
                onPress={() => increseOne()}
              >
                <Icon style={{ fontSize: 40 }} name="add" />
              </Button>
            </Grid>
            <Text style={globalStyles.price}>
              SubTotal: {"  "}${total}
            </Text>
          </Form>
        </Content>
      </ImageBackground>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.button}
            onPress={() => {
              confirmOrder();
            }}
          >
            <Text style={globalStyles.buttonText}>Add Order</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

const styles = StyleSheet.create({
  backgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
});

export default DishForm;
