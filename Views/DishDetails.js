import React, { useContext } from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Button,
  Body,
  Card,
  CardItem,
  Container,
  Content,
  Footer,
  FooterTab,
  H1,
  Text,
} from "native-base";
import globalStyles from "../styles/global";

import OrderContext from "../context/orders/orderContext";

const DishDetails = () => {
  // Order Context
  const { dish } = useContext(OrderContext);
  const { name, imgURL, description, price } = dish;

  // Redirect
  const navigation = useNavigation();

  return (
    <Container style={[globalStyles.container, { backgroundColor: "#E5E7E9" }]}>
      <Content style={globalStyles.content}>
        <H1 style={globalStyles.title}>{name}</H1>
        <Card style={{ borderRadius: 15 }}>
          <CardItem>
            <Body>
              <Image
                style={[globalStyles.image, { borderRadius: 15, marginVertical: 20 }]}
                source={{ uri: imgURL }}
              />
              <Text style={globalStyles.price}>Price: ${price}</Text>
              <Text style={{ marginBottom: 10 }}>{description}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
      <Footer>
        <FooterTab>
          <Button
            style={globalStyles.button}
            onPress={() => {
              navigation.navigate("DishForm");
            }}
          >
            <Text style={globalStyles.buttonText}>Order</Text>
          </Button>
        </FooterTab>
      </Footer>
    </Container>
  );
};

export default DishDetails;
