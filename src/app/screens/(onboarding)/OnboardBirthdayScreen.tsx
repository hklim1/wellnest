import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";
import { Button, Icon, Image, ThemeProvider, useTheme } from "@rneui/themed";
import ProgressBar from "../../../components/ProgressBar";
import DatePicker from "react-native-date-picker";
import dayjs from "dayjs";
import { useUserBirthday } from "../../utils/globalStorage";

export default function OnboardBirthdayScreen() {
  const dayjs = require("dayjs");
  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);

  const [flag, setFlag] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const { birthday, setBirthday } = useUserBirthday();
  const [stagedBirthday, setStagedBirthday] = useState(new Date());

  return (
    <View style={styles.background}>
      <View style={styles.textAndImage}>
        <Text style={styles.onboardText}>Enter your birthday</Text>
        <View style={styles.dateInputContainer}>
          <DatePicker
            modal
            mode="date"
            open={open}
            date={date}
            onConfirm={(date) => {
              setDateSelected(true);
              setOpen(false);
              setDate(date);
              setBirthday(date.toDateString());
              setFlag(true);
            }}
            onCancel={() => {
              setOpen(false);
            }}
            androidVariant="iosClone"
          />
          <Pressable onPress={() => setOpen(true)}>
            <TextInput
              readOnly={true}
              placeholder="Month"
              value={dateSelected ? dayjs(new Date(date)).format("MMMM") : null}
              placeholderTextColor="#b5b9b9"
              style={styles.monthInput}
            />
          </Pressable>
          <Pressable onPress={() => setOpen(true)}>
            <TextInput
              readOnly={true}
              placeholder="Day"
              placeholderTextColor="#b5b9b9"
              style={styles.dayInput}
              value={dateSelected ? dayjs(new Date(date)).format("DD") : null}
              onPressIn={() => setOpen(true)}
            />
          </Pressable>
          <Pressable onPress={() => setOpen(true)}>
            <TextInput
              readOnly={true}
              placeholder="Year"
              placeholderTextColor="#b5b9b9"
              style={styles.yearInput}
              value={dateSelected ? dayjs(new Date(date)).format("YYYY") : null}
              onPressIn={() => setOpen(true)}
            />
          </Pressable>
        </View>
      </View>
      <View style={styles.bottomPortion}>
        <View style={styles.progressBar}>
          <ProgressBar activeButton={3} />
        </View>
        <Button
          disabled={flag === false}
          titleStyle={{ fontFamily: "Inter500", fontSize: 16 }}
          onPress={() => router.push("/screens/OnboardGenderScreen")}
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
  dateInputContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
  },
  dayInput: {
    backgroundColor: "#eff4f4",
    width: 100,
    marginTop: 24,
    marginRight: 10,
    height: 51,
    borderRadius: 10,
    padding: 16,
    fontFamily: "Inter400",
    fontSize: 16,
    color: "black",
  },
  monthInput: {
    backgroundColor: "#eff4f4",
    width: 130,
    marginTop: 24,
    marginRight: 10,
    height: 51,
    borderRadius: 10,
    padding: 16,
    fontFamily: "Inter400",
    fontSize: 16,
    color: "black",
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
  yearInput: {
    backgroundColor: "#eff4f4",
    width: 130,
    marginTop: 24,
    height: 51,
    borderRadius: 10,
    padding: 16,
    fontFamily: "Inter400",
    fontSize: 16,
    color: "black",
  },
});
