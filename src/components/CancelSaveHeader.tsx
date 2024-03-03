import React from "react";
import { Button, Icon } from "@rneui/themed";
import { Stack, router } from "expo-router";
import { Pressable, Text, StyleSheet, View } from "react-native";

interface TitleProps {
  titleName: string;
  onSave?: () => void;
}

export const CancelSaveHeader = ({ titleName, onSave }: TitleProps) => {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitle: "Cancel",
          headerShown: true,
          title: titleName,
          headerTitleStyle: {
            fontSize: 16,
            fontFamily: "Inter600",
          },
          headerStyle: {
            backgroundColor: "#eff4f4",
          },
          headerTitleAlign: "center",
          headerLeft: () => (
            <Pressable onPress={() => router.back()}>
              <Text style={styles.textButtons}>Cancel</Text>
            </Pressable>
          ),
          headerRight: () => (
            <Pressable
              onPress={() => {
                router.back();
                onSave?.();
              }}
            >
              <Text style={styles.textButtons}>Save</Text>
            </Pressable>
          ),
          headerShadowVisible: false,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
  },
  textButtons: {
    fontFamily: "Inter400",
    // textDecorationLine: "underline",
    color: "#4B86ED",
    fontSize: 16,
  },
});
