import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
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

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = firebaseAuth;

  const themeStyle = useStyles();
  const { theme } = useTheme();
  console.log("theme", themeStyle);

  const signUp = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(response);
      // alert("Incorrect email or password")
    } catch (error: any) {
      console.log(error);
      alert("Registration failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={AppTheme}>
      <ImageBackground
        source={require("../../../../assets/treeBackground.png")}
        style={styles.background}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.topHalf}>
          <Button
            buttonStyle={styles.backButton}
            onPress={() => router.back()}
            title={"  "}
            icon={<Feather name="chevron-left" color="#5A5E5E" size={24} />}
          />
          <Text style={styles.createAcc}>Create an account</Text>
        </View>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior="padding">
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email address"
              autoCapitalize="none"
              onChangeText={(text) => setEmail(text)}
            ></TextInput>
            {loading ? (
              <ActivityIndicator size="large" color="#0FA6B0" />
            ) : (
              <>
                <Button
                  disabled={email === ""}
                  title="Continue"
                  titleStyle={{
                    color: "white",
                    // fontWeight: "300",
                    fontSize: 16,
                    fontFamily: "Inter400",
                  }}
                  onPress={() =>
                    router.push({
                      pathname: "/screens/CreatePasswordScreen",
                      params: { email: email },
                    })
                  }
                  style={{
                    width: 350,
                    marginLeft: 3,
                    marginTop: 4,
                  }}
                ></Button>
              </>
            )}
          </KeyboardAvoidingView>
          <View style={{ flexDirection: "row", marginVertical: 30 }}>
            <View
              style={{
                backgroundColor: "#999F9F",
                height: 1,
                flex: 1,
                alignSelf: "center",
              }}
            />
            <Text
              style={{
                color: "black",
                alignSelf: "center",
                paddingHorizontal: 10,
                fontSize: 14,
                fontFamily: "Inter400",
              }}
            >
              or
            </Text>
            <View
              style={{
                backgroundColor: "#999F9F",
                height: 1,
                flex: 1,
                alignSelf: "center",
              }}
            />
          </View>
          <Button
            title="Continue with Google"
            titleStyle={{
              flex: 1,
              color: "black",
              fontFamily: "Inter500",
              fontSize: 16,
            }}
            icon={
              <Image
                source={GoogleIcon}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            }
            onPress={() => router.navigate("/screens/CreatePasswordScreen")}
            buttonStyle={styles.googleButton}
          ></Button>
        </View>
        <Text style={styles.policies}>
          By continuing, you agree to Wellnest's{" "}
          <Link
            style={{
              color: "#5A5E5E",
              fontFamily: "Inter400",
              textDecorationLine: "underline",
            }}
            href="screens/LoginScreen"
          >
            Terms & Conditions
          </Link>{" "}
          and{" "}
          <Link
            style={{
              color: "#5A5E5E",
              fontFamily: "Inter400",
              textDecorationLine: "underline",
            }}
            href="screens/LoginScreen"
          >
            Privacy Policy
          </Link>
        </Text>
      </ImageBackground>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    padding: 16,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: "#B7E4E7",
    padding: 0,
  },
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
    position: "absolute",
    top: 168,
    width: "100%",
    // borderColor: "black",
    // borderWidth: 2,
  },
  createAcc: {
    position: "absolute",
    top: 76,
    fontSize: 20,
    // fontWeight: "400",
    fontFamily: "Inter500",
  },
  googleButton: {
    width: "100%",
    height: 50,
    // marginLeft: 3,
    // marginTop: 4,
    backgroundColor: "#f0f0f0",
    color: "black",
    borderColor: "#979B9B",
    borderWidth: 1,
  },
  input: {
    // alignItems: "center",
    // justifyContent: "center",
    fontFamily: "Inter400",
    fontSize: 16,
    // fontColor: "#f0f0f0",
    padding: 16,
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#979B9B",
    backgroundColor: "#f0f0f0",
    // margin: 4,
    marginBottom: 10,
  },
  policies: {
    width: 250,
    color: "#5A5E5E",
    textAlign: "center",
    paddingHorizontal: 10,
    fontSize: 12,
    fontFamily: "Inter400",
    // fontWeight: "300",
    position: "absolute",
    bottom: 50,
  },
  topHalf: {
    position: "absolute",
    top: 50,
    left: 16,
    width: 300,
  },
});
