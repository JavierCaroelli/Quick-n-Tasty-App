import { StyleSheet } from "react-native";

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  content: {
    marginHorizontal: "2.5%",
    flex: 1,
  },
  button: {
    backgroundColor: "#FFDA00",
    textAlign: "center",
  },
  buttonText: {
    textAlign: "center",
    textTransform: "uppercase",
    fontWeight: "bold",
    color: "#000",
  },
  title: {
    textAlign: "center",
    marginTop: 40,
    marginBottom: 20,
    fontSize: 30,
  },
  image: {
    height: 300,
    width: "100%",
  },
  price: {
    marginVertical: 20,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default globalStyles;
