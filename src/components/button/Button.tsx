import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { ButtonProps } from "../../types/types";


const Button: React.FC<ButtonProps> = ({ title, onPress, backgroundColor = "#3797EF" }) => {
  return (
    <TouchableOpacity style={[styles.button, { backgroundColor }]} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    top: 18,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Button;
