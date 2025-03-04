import React from "react";
import { TextInput, StyleSheet } from "react-native";

import { TextInputProps } from "../../types/types";

const Input: React.FC<TextInputProps> = ({ value, onChangeText, ...props }) => {
  return (
    <TextInput
      style={InputStyles.input}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor="#aaa"
      {...props}
    />
  );
};

export const InputStyles = StyleSheet.create({
  input: {
    width: "100%",
    backgroundColor: "#FAFAFA",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    
    
  },
});

export default Input;
