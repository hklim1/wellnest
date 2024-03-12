import React, { useState } from "react";
import {
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
import { useUserGender } from "../../utils/globalStorage";

export default function OnboardGenderScreen() {
  const [male, setMale] = useState(false);
  const [female, setFemale] = useState(false);
  const [other, setOther] = useState(false);
  const { gender, setGender } = useUserGender();

  return (
    <View style={styles.background}>
      <View style={styles.textAndImage}>
        <Text style={styles.onboardText}>What do you identify as?</Text>
        <Pressable
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: male ? "#B7E4E7" : "#eff4f4",
            marginBottom: 10,
          }}
          onPress={() => {
            setMale(true);
            setGender("male");
            setFemale(false);
            setOther(false);
          }}
        >
          <Text
            style={male ? styles.genderInputActive : styles.genderInputInactive}
          >
            Male
          </Text>
          <Feather
            style={{ paddingRight: 16 }}
            name="check"
            size={18}
            color="black"
            opacity={male ? 1 : 0}
          />
        </Pressable>
        <Pressable
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: female ? "#B7E4E7" : "#eff4f4",
            marginBottom: 10,
          }}
          onPress={() => {
            setMale(false);
            setFemale(true);
            setGender("female");
            setOther(false);
          }}
        >
          <Text
            style={
              female ? styles.genderInputActive : styles.genderInputInactive
            }
          >
            Female
          </Text>
          <Feather
            style={{ paddingRight: 16 }}
            name="check"
            size={18}
            color="black"
            opacity={female ? 1 : 0}
          />
        </Pressable>
        <Pressable
          style={{
            width: "100%",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            borderRadius: 10,
            backgroundColor: other ? "#B7E4E7" : "#eff4f4",
            marginBottom: 10,
          }}
          onPress={() => {
            setMale(false);
            setFemale(false);
            setOther(true);
            setGender("other");
          }}
        >
          <Text
            style={
              other ? styles.genderInputActive : styles.genderInputInactive
            }
          >
            Other
          </Text>
          <Feather
            style={{ paddingRight: 16 }}
            name="check"
            size={18}
            color="black"
            opacity={other ? 1 : 0}
          />
        </Pressable>
      </View>
      <View style={styles.bottomPortion}>
        <View style={styles.progressBar}>
          <ProgressBar activeButton={4} />
        </View>
        <Button
          disabled={female === false && male === false && other === false}
          titleStyle={{ fontFamily: "Inter500", fontSize: 16 }}
          onPress={() => router.push("/screens/OnboardIconScreen")}
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
    paddingTop: 14,
    paddingBottom: 16,
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
    // paddingVertical: 16,
    paddingTop: 14,
    paddingBottom: 16,
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
