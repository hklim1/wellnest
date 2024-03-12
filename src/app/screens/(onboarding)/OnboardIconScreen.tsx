import React, { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Button, Icon, Image, ThemeProvider, useTheme } from "@rneui/themed";
import ProgressBar from "../../../components/ProgressBar";
import { Feather } from "@expo/vector-icons";
import { UserIcon } from "../../../components/UserIcons";

export default function OnboardIconScreen() {
  const allIcons = [
    "cow",
    "gorilla",
    "koala",
    "alligator",
    "pig",
    "fox",
    "bear",
    "penguin",
    "frog",
    "lion",
  ];
  const [dIcon, setIcon] = useState("member");

  return (
    <View style={styles.background}>
      <View style={styles.textAndImage}>
        <Text style={styles.onboardText}>Choose a profile icon</Text>
        <View style={{ alignItems: "center", marginTop: 16 }}>
          <FlatList
            nestedScrollEnabled
            numColumns={5}
            columnWrapperStyle={{ gap: 16 }}
            contentContainerStyle={{ gap: 16 }}
            data={allIcons}
            renderItem={({ item }) => {
              return (
                <Pressable onPress={() => setIcon(item)}>
                  <UserIcon
                    name={dIcon == item ? item + "Selected" : item + "Circle"}
                    width={50}
                    height={50}
                  />
                </Pressable>
              );
            }}
          />
        </View>
      </View>
      <View style={styles.bottomPortion}>
        <View style={styles.progressBar}>
          <ProgressBar activeButton={5} />
        </View>
        <Button
          titleStyle={{ fontFamily: "Inter500", fontSize: 16 }}
          onPress={() => router.push("/screens/HomeScreen")}
        >
          Next
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    padding: 16,
    // display: "flex",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  bottomPortion: {
    width: "100%",
    position: "absolute",
    bottom: 75,
  },
  genderInputActive: {
    flex: 1,
    backgroundColor: "#B7E4E7",
    // marginBottom: 10,
    height: 51,
    borderRadius: 10,
    padding: 16,
    paddingLeft: 24,
    fontFamily: "Inter400",
    fontSize: 16,
    // display: "flex",
    // justifyContent: "space-around",
    // flexDirection: "column",
  },
  genderInputInactive: {
    flex: 1,
    backgroundColor: "#eff4f4",
    // marginBottom: 10,
    height: 51,
    borderRadius: 10,
    padding: 16,
    paddingLeft: 24,
    fontFamily: "Inter400",
    fontSize: 16,
    // display: "flex",
    // justifyContent: "space-around",
    // flexDirection: "column",
  },
  onboardText: {
    fontFamily: "Inter600",
    fontSize: 28,
    marginBottom: 24,
  },
  progressBar: {
    alignSelf: "center",
    marginBottom: 16,
  },
  textAndImage: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    top: 220,
    width: "100%",
  },
});
