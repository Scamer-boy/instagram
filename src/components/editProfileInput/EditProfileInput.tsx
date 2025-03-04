import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { InputFieldProps } from "../../types/types";


const InputField: React.FC<InputFieldProps> = ({ label, value, onChangeText, placeholder, isMultiline = false }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, isMultiline && styles.multilineInput]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        multiline={isMultiline}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginBottom: -2,
    
  },
  label: {
    fontSize: 14, 
    fontWeight: "500",
    color: "#333", 
    marginBottom: 2,
    top: 28,
  },
  input: {
    height: 30,
    borderBottomWidth: 1,
    borderBottomColor: "#D3D3D3",
    fontSize: 14,
    backgroundColor: "transparent",
    color: "#333",
    paddingVertical: 5,
    paddingLeft: 0,
    marginLeft: 100,
    
  },
  multilineInput: {
    height: -10,
  },
});

export default InputField;
