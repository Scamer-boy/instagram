

// components/Button.tsx
import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

type ButtonProps = {
  title: string;
  onPress: () => void;
  backgroundColor?: string;
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ title, onPress, backgroundColor = "#0095F6" }) => {
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
