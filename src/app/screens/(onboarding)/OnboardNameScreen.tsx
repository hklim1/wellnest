import React, { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Button, Icon, Image, ThemeProvider, useTheme } from "@rneui/themed";
import ProgressBar from "../../../components/ProgressBar";
import { useUserFirstName } from "../../utils/globalStorage";
import { AppTheme } from "../../themes";

export default function OnboardWelcomeScreen() {
  const [flag, setFlag] = useState(false);
  const [stagedFirstName, setStagedFirstName] = useState<string>("");
  const { firstName, setFirstName } = useUserFirstName();

  useEffect(() => {
    if (firstName !== null) {
      setStagedFirstName(firstName);
    }
  }, [firstName]);

  return (
    <ThemeProvider theme={AppTheme}>
      <View style={styles.background}>
        <View style={styles.textAndImage}>
          <Text style={styles.onboardText}>What is your name?</Text>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#b5b9b9"
            style={styles.nameInput}
            onChangeText={(text) => {
              setStagedFirstName(text);
              setFlag(true);
            }}
            value={stagedFirstName}
          />
        </View>
        <View style={styles.bottomPortion}>
          <View style={styles.progressBar}>
            <ProgressBar activeButton={2} />
          </View>
          <Button
            disabled={flag === false}
            // disabledStyle={{ backgroundColor: "black" }}
            titleStyle={{ fontFamily: "Inter500", fontSize: 16 }}
            onPress={() => {
              setFirstName(stagedFirstName);
              router.push("/screens/OnboardBirthdayScreen");
            }}
          >
            Next
          </Button>
        </View>
      </View>
    </ThemeProvider>
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
  nameInput: {
    backgroundColor: "#eff4f4",
    width: "100%",
    marginTop: 24,
    height: 51,
    borderRadius: 10,
    padding: 16,
    fontFamily: "Inter400",
    fontSize: 16,
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
    width: "100%",
  },
});
