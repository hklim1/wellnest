import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router"; //Stack
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProvider } from "@rneui/themed";
import { AppTheme, useStyles } from "./themes";
// import { Login, LoginScreen } from "./screens/LoginScreen";
import WelcomeScreen from "./screens/(auth)/WelcomeScreen";
import { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "../../FirebaseConfig";
import {
  useFonts,
  Inter_100Thin,
  Inter_200ExtraLight,
  Inter_300Light,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_800ExtraBold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import { usePushNotifications } from "./hooks/usePushNotifications";

export default function App() {
  const { expoPushToken, notification } = usePushNotifications();

  const data = JSON.stringify(notification, undefined, 2);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log("user", user);
      setUser(user);
    });
  }, []);

  return (
    <SafeAreaProvider>
      {/* <ThemeProvider theme={AppTheme}> */}
      <WelcomeScreen />
      <Text>Token: {expoPushToken?.data ?? ""}</Text>
      <Text>{data}</Text>
      {/* redirect user to homescreen if they already exist */}
      {/* </ThemeProvider> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
