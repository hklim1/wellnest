import { time } from "console";
import React, { useState } from "react";
import { Calendar } from "react-native-calendars";
import ComponentDivider from "../../../components/ComponentDivider";
import TextInputIcon from "../../../components/TextInputIcon";
import DatePicker from "react-native-modern-datepicker";
import { CancelSaveHeader } from "../../../components/CancelSaveHeader";
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  Text,
} from "react-native";
import Symptoms from "../../../components/Symptoms";
import { Feather } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Button } from "@rneui/themed";
import UserIconHeader from "../../../components/UserIconHeader";
import { addSymptoms } from "../../utils/firebaseUtils";
import uuid from "react-native-uuid";
import Toast from "react-native-root-toast";

const AddSymptomsScreen = () => {
  const dayjs = require("dayjs");
  var utc = require("dayjs/plugin/utc");
  dayjs.extend(utc);

  const currentTime = dayjs(new Date()).format("h:mm A");
  const stringId = uuid.v4().toString();

  const [openCalender, setOpenCalender] = useState(false);
  const [openTime, setOpenTime] = useState(false);
  const [openSymptoms, setOpenSymptoms] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(currentTime);
  const [notes, setNotes] = useState("");
  const [accountId, setAccountId] = useState("");
  const [activeSymptoms, setActiveSymptoms] = useState(new Set<string>());
  console.log(activeSymptoms);
  const stringSymptoms = Array.from(activeSymptoms).join(", ");

  return (
    <SafeAreaView style={{ backgroundColor: "#eff4f4" }}>
      <ScrollView style={{ backgroundColor: "#eff4f4" }}>
        <CancelSaveHeader
          titleName="Symptoms"
          onSave={() => {
            addSymptoms(
              stringId,
              accountId,
              date,
              time,
              Array.from(activeSymptoms),
              notes
            );
            Toast.show("New symptom has been added", {
              duration: Toast.durations.LONG,
              position: Toast.positions.BOTTOM,
            });
          }}
        />
        <View style={styles.container}>
          <ComponentDivider>
            <TextInputIcon
              name="calendar"
              placeholder="Date"
              value={dayjs(new Date(date)).format("ddd, MMM DD, YYYY")}
              // new Date(date).toUTCString().slice(0, 16).format("ddd, MMM DD, YYYY")}
              onPressIn={() => setOpenCalender(true)}
            />
            {openCalender && (
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
                  setOpenCalender(false);
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
            <TextInputIcon
              name="frown"
              placeholder="Symptoms"
              value={stringSymptoms}
              onPressIn={() => setOpenSymptoms(!openSymptoms)}
              // onPressOut={() => setOpenSymptoms(false)}
            />
            {openSymptoms && (
              <Symptoms
                onAdd={(symptom) => {
                  activeSymptoms.add(symptom);
                  setActiveSymptoms(activeSymptoms);
                }}
                onRemove={(symptom) => {
                  activeSymptoms.delete(symptom);
                  setActiveSymptoms(activeSymptoms);
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
              marginVertical: 10,
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
                height: 100,
                fontFamily: "Inter400",
                flexWrap: "wrap",
              }}
              // value={}
              textAlignVertical={"top"}
              placeholderTextColor="grey"
              placeholder="Add a note"
              multiline={true}
              onPressIn={() => setOpenSymptoms(false)}
              onChangeText={(notes) => setNotes(notes)}
              // onPressOut={() => console.log(notes)}
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
  icons: {
    // marginTop: 10,
    // borderWidth: 2,
    // borderColor: "blue",
    height: "auto",
    // display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    // alignContent: "flex-start",
  },
});
export default AddSymptomsScreen;
