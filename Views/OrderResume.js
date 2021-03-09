import React, { useContext, useEffect } from "react";
import { Alert } from "react-native";
import {
  Container,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Button,
  H1,
  Footer,
  FooterTab,
} from "native-base";
import { useNavigation } from "@react-navigation/native";
import OrderContext from "../context/orders/orderContext";

import globalStyles from "../styles/global";

import firebase from "../firebase";

const OrderResume = () => {
  const navigation = useNavigation();

  // Order Context
  const { order, total, showTotalPrice, deleteItem, orderSended } = useContext(OrderContext);

  useEffect(() => {
    sumTotal();
  }, [order]);

  // Calculate Total of Open Orders
  const sumTotal = () => {
    let newTotal = 0;
    newTotal = order.reduce((newTotal, product) => newTotal + product.total, 0);
    showTotalPrice(newTotal);
  };

  // Confirm Cancele
  const confirmErase = (id) => {
    Alert.alert("Sure to Cancel this Item?", "You are about to delete this item from your order", [
      {
        text: "No, Keep It",
        style: "cancel",
      },
      {
        text: "Yes, Delete it ",
        onPress: () => {
          // Erase it from State
          deleteItem(id);
        },
      },
    ]);
  };

  // Order Ready
  const orderReady = () => {
    Alert.alert("Check Your Order", "Once your order is send, you can't change it.", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Confirm",
        onPress: async () => {
          // Save Order in Firebase
          const orderObj = {
            deliverTime: 0,
            complete: false,
            total: Number(total),
            order: order,
          };
          try {
            const order = await firebase.db.collection("orders").add(orderObj);
            orderSended(order.id);

            // Redirect to OrderProgres
            navigation.navigate("OrderStatus");
          } catch (error) {
            console.log(error);
          }
        },
      },
    ]);
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>Order Summary</H1>
        {order.map((dish, i) => {
          const { name, qty, imgURL, id, price } = dish;
          return (
            <List key={id + 1}>
              <ListItem thumbnail>
                <Left>
                  <Thumbnail large square style={{ borderRadius: 10 }} source={{ uri: imgURL }} />
                </Left>
                <Body>
                  <Text>{name}</Text>
                  <Text>Quantity: {qty}</Text>
                  <Text>Price: ${price} p/unit</Text>
                  <Button
                    danger
                    onPress={() => confirmErase(id)}
                    full
                    style={{ marginTop: 20, borderRadius: 10 }}
                  >
                    <Text style={[globalStyles.buttonText, { color: "#fff" }]}>Cancel</Text>
                  </Button>
                </Body>
              </ListItem>
            </List>
          );
        })}
        <Text style={globalStyles.price}>Total: ${total} </Text>
        <Button
          onPress={() => {
            navigation.navigate("Menu");
          }}
          style={[
            globalStyles.button,
            { marginTop: 30, backgroundColor: "#000", borderRadius: 10 },
          ]}
          full
        >
          <Text style={[globalStyles.buttonText, { color: "#fff" }]}>Back to Menu</Text>
        </Button>
      </Content>
      <Footer>
        <FooterTab>
          <Button style={globalStyles.button} onPress={() => orderReady()}>
            <Text style={globalStyles.buttonText}>Order Ready</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default OrderResume;
