import React from "react";
import { View, TextInput, TextInputProps, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  name: FeatherIcon;
  color?: string;
} & TextInputProps;

const TextInputIcon = ({ name, ...inputProps }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Feather size={24} color="grey" name={name} />
      <TextInput
        {...inputProps}
        cursorColor={"black"}
        style={styles.input}
        placeholderTextColor="grey"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "white",
    alignItems: "center",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter400",
  },
});

export default TextInputIcon;
