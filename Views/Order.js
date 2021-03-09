import React from "react";
import { View, StyleSheet, ImageBackground } from "react-native";
import { Container, Button, Text } from "native-base";
import globalStyles from "../styles/global";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();

  return (
    <Container style={globalStyles.container}>
      <ImageBackground source={require("../styles/imgs/wallpaper.jpg")} style={styles.backgImage}>
        <View
          style={{
            marginTop: 50,
            backgroundColor: "#FFF",
            paddingVertical: "10%",
            marginHorizontal: "2.5%",
            borderRadius: 10,
          }}
        >
          <Button
            transparent
            block
            bordered
            style={[globalStyles.button, { borderRadius: 10, marginHorizontal: "2.5%" }]}
            onPress={() => navigation.navigate("Menu")}
          >
            <Text style={globalStyles.buttonText}>Ready to Order !</Text>
          </Button>
        </View>
      </ImageBackground>
    </Container>
  );
};

const styles = StyleSheet.create({
  orderContent: {
    flexDirection: "column",
    justifyContent: "center",
  },
  backgImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    opacity: 0.8,
  },
});

export default Menu;
