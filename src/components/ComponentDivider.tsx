import React, { ReactNode } from "react";
import { View, FlatList, StyleSheet } from "react-native";

const ComponentDivider = ({ children }: { children: ReactNode }) => {
  return (
    <FlatList
      data={React.Children.toArray(children)}
      renderItem={({ item }) => <View>{item}</View>}
      contentContainerStyle={{
        padding: 0,
        borderRadius: 10,
        backgroundColor: "white",
        overflow: "hidden",
        margin: 0,
      }}
      ItemSeparatorComponent={() => <Separator />}
    />
  );
};

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#d4d4d4",
  },
});

export default ComponentDivider;
