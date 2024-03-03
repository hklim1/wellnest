import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  Image,
  TextInput,
  View,
} from "react-native";
import { Link, Stack, router, Tabs } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Icon, ThemeProvider } from "@rneui/themed";
import { AppTheme, useStyles } from "../../themes";
// import LoginScreen from "./LoginScreen";

export default function WelcomeScreen() {
  const themeStyle = useStyles();

  return (
    <ImageBackground
      source={require("../../../../assets/treeBackground.png")}
      style={styles.background}
      // imageStyle={{ opacity: 0.3 }}
    >
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.imgContainer}>
        <View style={{ paddingBottom: 5 }}>
          <Image
            source={require("../../../../assets/wellnestLogo.png")}
            style={{
              height: 38,
              width: 50,
              resizeMode: "center",
            }}
          />
        </View>
        <Image
          source={require("../../../../assets/wellnestName.png")}
          style={{
            height: 28,
            width: 150,
            resizeMode: "center",
          }}
        />
        <Text style={{ fontSize: 16, fontFamily: "Inter400", paddingTop: 10 }}>
          {" "}
          A unified approach to family health
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <Button
          style={{ width: "100%" }}
          titleStyle={{ fontFamily: "Inter500", fontSize: 16 }}
          onPress={() => router.push("/screens/RegisterScreen")}
        >
          Start
        </Button>
        <Pressable onPress={() => router.push("/screens/LoginScreen")}>
          <Text style={styles.loginText}>
            {"Already a member? "}
            <Link
              style={{
                color: "#0FA6B0",
                textDecorationLine: "underline",
              }}
              href="screens/LoginScreen"
            >
              Login
            </Link>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  basicContainer: {
    flex: 1,
  },
  buttonsContainer: {
    width: "90%",
    paddingVertical: 48,
    display: "flex",
  },
  loginText: {
    paddingVertical: 16.5,
    color: "#979B9B",
    fontFamily: "Inter500",
    fontSize: 16,
    alignSelf: "center",
  },
  // logo: {
  //   position: "absolute",
  //   top: 220,
  // },
  logoName: {
    // position: "absolute",
    // top: "40%",
    // fontSize: 40,
    // fontWeight: "600",
    // fontFamily: "Inter600",
    // color: "#0FA6B0",
  },
  imgContainer: {
    height: 200,
    width: "100%",
    position: "absolute",
    top: "32%",
    // borderWidth: 2,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
