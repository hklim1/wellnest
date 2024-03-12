import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, Stack, router } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Icon, Image, ThemeProvider, useTheme } from "@rneui/themed";
import { AppTheme, useStyles } from "../../themes";
import { firebaseAuth } from "../../../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Feather } from "@expo/vector-icons";
import { GoogleIcon } from "../../../../assets";
import ProgressBar from "../../../components/ProgressBar";
// import Rocket from "../../../../assets/rocket.png";

export default function OnboardWelcomeScreen() {
  return (
    <View style={styles.background}>
      <View style={styles.textAndImage}>
        <Text style={styles.onboardText}>Welcome to Wellnest!</Text>
        <Text style={styles.onboardText}>Let's get you set up.</Text>
        <Image
          source={require("../../../../assets/rocket.png")}
          style={{
            height: 150,
            width: 150,
            resizeMode: "center",
            marginTop: 35,
          }}
        />
      </View>
      <View style={styles.bottomPortion}>
        <View style={styles.progressBar}>
          <ProgressBar activeButton={1} />
        </View>
        <Button
          titleStyle={{ fontFamily: "Inter500", fontSize: 16 }}
          onPress={() => router.push("/screens/OnboardNameScreen")}
        >
          Get Started
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
  onboardText: {
    fontFamily: "Inter600",
    fontSize: 28,
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
  },
});
