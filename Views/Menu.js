import React, { Fragment, useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FirebaseContext from "../context/firebase/firebaseContext";
import OrderContext from "../context/orders/orderContext";

import { Container, Separator, Content, List, ListItem, Thumbnail, Text, Body } from "native-base";
import globalStyles from "../styles/global";

const Menu = () => {
  // Firebase Context
  const { menu, getProducts } = useContext(FirebaseContext);

  // Order Context
  const { selectDish } = useContext(OrderContext);

  // Redirect Hook
  const navigation = useNavigation();

  useEffect(() => {
    getProducts();
  }, []);

  const showHeading = (category, i) => {
    if (i > 0) {
      const prevCat = menu[i - 1].category;
      if (prevCat !== category) {
        return (
          <Separator style={styles.separator}>
            <Text style={styles.separatorText}>{category}</Text>
          </Separator>
        );
      }
    } else {
      return (
        <Separator style={styles.separator}>
          <Text style={styles.separatorText}>{category}</Text>
        </Separator>
      );
    }
  };

  return (
    <Container style={globalStyles.container}>
      <Content style={globalStyles.content}>
        <List>
          {menu &&
            menu.map((dish, i) => {
              const { id, name, price, category, description, imgURL } = dish;
              return (
                <Fragment key={id}>
                  {showHeading(category, i)}
                  <ListItem
                    onPress={() => {
                      selectDish(dish);
                      navigation.navigate("DishDetails");
                    }}
                  >
                    <Thumbnail large square style={{ borderRadius: 10 }} source={{ uri: imgURL }} />
                    <Body>
                      <Text>{name}</Text>
                      <Text>Price: ${price}</Text>
                      <Text note numberOfLines={2}>
                        {description}
                      </Text>
                    </Body>
                  </ListItem>
                </Fragment>
              );
            })}
        </List>
      </Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  separator: {
    backgroundColor: "#000",
  },
  separatorText: {
    color: "#FFDA00",
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default Menu;
