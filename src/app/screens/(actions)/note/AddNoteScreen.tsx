import { time } from "console";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import ComponentDivider from "../../../../components/ComponentDivider";
import TextInputIcon from "../../../../components/TextInputIcon";
import DatePicker from "react-native-modern-datepicker";
import { CancelSaveHeader } from "../../../../components/CancelSaveHeader";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
  Pressable,
} from "react-native";
import Symptoms from "../../../../components/Symptoms";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Button, Icon } from "@rneui/themed";
import UserIconHeader from "../../../../components/UserIconHeader";
import { addEventNotes } from "../../../utils/firebaseUtils";
import uuid from "react-native-uuid";
import Toast from "react-native-root-toast";
import { router } from "expo-router";

const AddNoteScreen = () => {
  const dayjs = require("dayjs");
  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);

  const currentTime = dayjs(new Date()).format("h:mm A");
  const stringId = uuid.v4().toString();

  const [noteTitle, setNoteTitle] = useState("");
  const [openCalendar, setOpenCalendar] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(currentTime);
  const [notes, setNotes] = useState("");
  const [accountId, setAccountId] = useState("");

  return (
    <SafeAreaView style={{ backgroundColor: "#eff4f4" }}>
      <ScrollView style={{ backgroundColor: "#eff4f4" }}>
        <CancelSaveHeader
          titleName="Note"
          onSave={() => {
            addEventNotes(stringId, accountId, noteTitle, date, time, notes);
            router.navigate("/screens/HomeScreen");
            Toast.show("New note has been added", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
            });
          }}
        />
        <View style={styles.container}>
          <ComponentDivider>
            <TextInputIcon
              name="edit"
              placeholder="Add title"
              onChangeText={(text) => setNoteTitle(text)}
              value={noteTitle}
            />
            <TextInputIcon
              name="calendar"
              placeholder="Date"
              value={dayjs(new Date(date)).format("ddd, MMM DD, YYYY")}
              // new Date(date).toUTCString().slice(0, 16).format("ddd, MMM DD, YYYY")}
              onPressIn={() => setOpenCalendar(true)}
            />
            {openCalendar && (
              <Calendar
                // minDate={new Date().toDateString()}
                markedDates={{
                  [date.toDateString()]: {
                    color: "#0FA6B0",
                    activeOpacity: 0.5,
                    selected: true,
                    marked: true,
                    selectedColor: "#0FA6B0",
                  },
                }}
                onDayPress={(date) => {
                  setDate(new Date(date.dateString));
                  setOpenCalendar(false);
                }}
              />
            )}
            <TextInputIcon
              name="clock"
              placeholder="Time"
              value={time}
              onPressIn={() => setOpenTime(true)}
            />
            {openTime && (
              <DatePicker
                mode="time"
                minuteInterval={5}
                onTimeChange={(selectedTime) => {
                  setTime(selectedTime);
                  setOpenTime(false);
                }}
              />
            )}
          </ComponentDivider>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              gap: 10,
              padding: 16,
              backgroundColor: "white",
              alignItems: "center",
              borderRadius: 10,
              height: "auto",
              marginVertical: 12,
            }}
          >
            {/* <View style={{ padding: 10}}> */}
            <Feather
              name="align-left"
              size={24}
              color="grey"
              style={{ alignSelf: "flex-start" }}
            />
            {/* </View> */}
            <TextInput
              cursorColor={"black"}
              style={{
                flex: 1,
                fontSize: 16,
                height: 150,
                fontFamily: "Inter400",
                flexWrap: "wrap",
              }}
              value={notes}
              textAlignVertical={"top"}
              placeholderTextColor="grey"
              placeholder="Add a note"
              multiline={true}
              onPressIn={() => {
                setOpenCalendar(false);
                setOpenTime(false);
              }}
              onChangeText={(notes) => setNotes(notes)}
            />
          </View>
          <Text style={styles.bottomText}>This is for:</Text>
          <View style={styles.icons}>
            <UserIconHeader onPress={(account) => setAccountId(account)} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bottomText: {
    fontFamily: "Inter400",
    fontSize: 16,
    paddingTop: 16,
    paddingBottom: 10,
  },
  container: {
    // flex: 1,
    backgroundColor: "#eff4f4",
    height: "auto",
    paddingHorizontal: 16,
  },
  //   doseButtons: {
  //     height: 30,
  //     width: 30,
  //     borderRadius: 50,
  //     padding: 0,
  //   },
  disabledButtons: {
    display: "flex",
    textAlign: "center",
    textAlignVertical: "center",
    paddingBottom: 4,
    marginLeft: 0,
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: "#EEF1F1",
    color: "#6B6F6F",
  },
  doseButtons: {
    display: "flex",
    textAlign: "center",
    textAlignVertical: "center",
    paddingBottom: 4,
    marginLeft: 0,
    height: 32,
    width: 32,
    borderRadius: 50,
    backgroundColor: "#0FA6B0",
    color: "white",
  },
  icons: {
    height: "auto",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Inter400",
  },
  wrapper: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 6,
    paddingHorizontal: 16,
    backgroundColor: "white",
    alignItems: "center",
  },
});

export default AddNoteScreen;
