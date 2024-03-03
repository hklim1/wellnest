import React, { useState, useRef, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { Link, Stack, router, useLocalSearchParams } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, Icon, ThemeProvider, useTheme } from "@rneui/themed";
import { AppTheme, useStyles } from "../../themes";
import { firebaseAuth } from "../../../../FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { SpeedDial } from "@rneui/base";
import { storeUser } from "../../utils/firebaseUtils";

type CreatePasswordScreenParams = {
  email: string;
};

export default function CreatePasswordScreen() {
  const params = useLocalSearchParams<CreatePasswordScreenParams>();

  const [email, setEmail] = useState(params.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = firebaseAuth;

  const themeStyle = useStyles();
  const { theme } = useTheme();
  console.log("theme", themeStyle);

  const isPasswordValid = () => {
    var regularExpression =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    if (password.length < 8) {
      alert("Password must be at least 8 characters");
      return false;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return false;
    }
    if (!regularExpression.test(password)) {
      alert("Password must contain at least 1 special character and 1 number");
      return false;
    } else {
      console.log("password === confirmpassword");
      return true;
    }
  };

  const signUp = async () => {
    setLoading(true);

    try {
      if (!isPasswordValid()) {
        return;
      }
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log(response);
      // console.log(response["user"]["uid"]);
      storeUser(response["user"]["uid"], email);
      router.replace("screens/HomeScreen");
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
        imageStyle={{ opacity: 0.4 }}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View style={styles.topHalf}>
          <Button
            buttonStyle={styles.backButton}
            // disabledStyle={{ backgroundColor: "red " }}
            onPress={() => router.back()}
            title={"  "}
            icon={<Icon name="chevron-left" color="#8c9292" size={30} />}
            // iconPosition="left"
          />
          <Text style={styles.selectPw}>Select a strong password</Text>
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
            <TextInput
              value={password}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Choose a password"
              autoCapitalize="none"
              onChangeText={(text) => setPassword(text)}
            ></TextInput>
            <TextInput
              value={confirmPassword}
              secureTextEntry={true}
              style={styles.input}
              placeholder="Re-enter password"
              autoCapitalize="none"
              onChangeText={(text) => setConfirmPassword(text)}
            ></TextInput>
            <Text style={styles.subtext}>
              At least 8 characters, 1 number, and 1 special character
            </Text>
            {loading ? (
              <ActivityIndicator size="large" color="#0FA6B0" />
            ) : (
              <>
                <Button
                  disabled={email === "" || password === ""}
                  title="Continue"
                  titleStyle={{
                    color: "white",
                    fontWeight: "300",
                    fontSize: 16,
                  }}
                  onPress={signUp}
                  style={{
                    width: 350,
                    // marginLeft: 3,
                    marginTop: 30,
                  }}
                ></Button>
              </>
            )}
          </KeyboardAvoidingView>
        </View>
        {/* <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={1}
          style={{
            flex: 1,
            justifyContent: "flex-end",
            alignSelf: "stretch",
            marginBottom: 16,
          }}
        >
          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <>
              <Button
                title="Continue"
                titleStyle={{
                  color: "white",
                  fontWeight: "300",
                  fontSize: 16,
                }}
                // onPress={signUp}
                onPress={() => router.push("/screens/main/HomeScreen")}
                style={{
                  width: 350,
                  // marginLeft: 3,
                  marginTop: 10,
                }}
              ></Button>
            </>
          )}
        </KeyboardAvoidingView> */}
      </ImageBackground>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: "#d3e7e9",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    position: "absolute",
    top: 200,
  },
  input: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    width: 350,
    height: 46,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "lightgrey",
    backgroundColor: "white",
    marginVertical: 4,
  },
  selectPw: {
    position: "absolute",
    top: 84,
    fontSize: 16,
    fontWeight: "400",
  },
  subtext: {
    color: "grey",
    fontSize: 13,
    alignSelf: "center",
    marginTop: 8,
  },
  topHalf: {
    position: "absolute",
    top: 80,
    left: 20,
    width: 300,
  },
});
