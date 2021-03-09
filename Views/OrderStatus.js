import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Container, Text, H1, H3, Button } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";
import OrderContext from "../context/orders/orderContext";
import firebase from "../firebase";
import Countdown from "react-countdown";

const OrderStatus = () => {
  const { idOrder } = useContext(OrderContext);

  const [time, setTime] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    const getProduct = () => {
      firebase.db
        .collection("orders")
        .doc(idOrder)
        .onSnapshot(function (doc) {
          setTime(doc.data().deliverTime);
          setCompleted(doc.data().complete);
        });
    };
    getProduct();
  }, [completed]);

  // Show Countdown
  const renderer = ({ minutes }) => {
    return <Text style={styles.time}>{minutes} Min</Text>;
  };

  // Navigation
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <ImageBackground source={require("../styles/imgs/status.jpg")} style={styles.backgImage}>
        <View
          style={{
            marginTop: 50,
            backgroundColor: "#FFF",
            paddingVertical: "10%",
            marginHorizontal: "2.5%",
          }}
        >
          {time == 0 && completed == false && (
            <>
              <Text style={{ textAlign: "center" }}>Your order has been processed</Text>
              <Text style={{ textAlign: "center" }}>We are calculating the delivery time</Text>
            </>
          )}
          {time > 0 && completed == false && (
            <>
              <Text style={{ textAlign: "center" }}>Your Order will be ready in:</Text>
              <Countdown date={Date.now() + time * 1000 * 60} renderer={renderer} />
            </>
          )}
          {completed && (
            <>
              <H1 style={[styles.completeText, { fontWeight: "bold" }]}>ORDER READY</H1>
              <H3 style={styles.completeText}>Please, come and get your order</H3>
              <Button
                style={[
                  globalStyles.button,
                  { marginTop: 100, borderRadius: 10, marginHorizontal: "2.5%" },
                ]}
                block
                transparent
                bordered
                onPress={() => {
                  navigation.navigate("Order");
                }}
              >
                <Text style={globalStyles.buttonText}>Make a New Order</Text>
              </Button>
            </>
          )}
        </View>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  time: {
    marginBottom: 20,
    marginTop: 30,
    fontSize: 60,
    textAlign: "center",
  },
  completeText: {
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: 20,
  },
  backgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
});

export default OrderStatus;
