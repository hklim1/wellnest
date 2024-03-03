import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Stack, useRouter } from "expo-router";
import Header from "../../../components/Header";
import { SafeAreaView } from "react-native-safe-area-context";
import UpcomingAppointments from "../../../components/UpcomingAppointments";
import UpcomingMedications from "../../../components/UpcomingMedications";
import { SpeedDial } from "@rneui/themed";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { WeekCalendar, CalendarProvider } from "react-native-calendars";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [day, setDay] = useState(new Date());
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.padding}>
        <Header />
        <View style={styles.weekCalendar}>
          <Text style={styles.calendarText}>Today</Text>
          <CalendarProvider date={day.toDateString()}>
            <WeekCalendar
              markingType="dot"
              markedDates={{
                [day.toDateString()]: {
                  color: "red",
                  activeOpacity: 0.5,
                  selected: true,
                  marked: true,
                  selectedColor: "red",
                },
              }}
              showSixWeeks={false}
              allowShadow={false}
              firstDay={0}
              pastScrollRange={(new Date().getFullYear() - 1900) * 12}
              futureScrollRange={(2099 - new Date().getFullYear()) * 12}
            />
          </CalendarProvider>
        </View>

        <UpcomingAppointments />
      </View>

      <UpcomingMedications />

      <SpeedDial
        isOpen={open}
        icon={{ name: "add", color: "#0FA6B0" }}
        openIcon={{ name: "close", color: "#0FA6B0" }}
        onOpen={() => setOpen(!open)}
        onClose={() => setOpen(!open)}
      >
        <Pressable
          style={styles.popup}
          onPress={() => router.navigate("/screens/note/AddNoteScreen")}
        >
          <Text style={styles.popupText}>Notes</Text>
          <Feather name="file-text" size={20} color="#0FA6B0" />
        </Pressable>
        <Pressable
          style={styles.popup}
          onPress={() => router.navigate("/screens/vaccine/AddVaccinesScreen")}
        >
          <Text style={styles.popupText}>Vaccine</Text>
          <MaterialCommunityIcons name="needle" size={20} color="#0FA6B0" />
        </Pressable>

        <Pressable
          style={styles.popup}
          onPress={() => router.navigate("/screens/AddSymptomsScreen")}
        >
          {/* <View style={styles.popup}> */}
          <Text style={styles.popupText}>Symptom</Text>
          <Feather name="frown" size={20} color="#0FA6B0" />
          {/* </View> */}
        </Pressable>

        <Pressable
          style={styles.popup}
          onPress={() =>
            router.navigate("/screens/medication/SelectUsageScreen")
          }
        >
          <Text style={styles.popupText}>Medication</Text>
          <MaterialCommunityIcons name="pill" size={20} color="#0FA6B0" />
        </Pressable>

        <Pressable
          style={styles.popup}
          onPress={() => router.navigate("/screens/Appointments")}
        >
          <Text style={styles.popupText}>Appointment</Text>
          <Feather name="calendar" size={20} color="#0FA6B0" />
        </Pressable>
      </SpeedDial>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7F7",
    gap: 15,
  },
  weekCalendar: {
    height: 120,
    padding: 8,
    borderRadius: 10,
    backgroundColor: "white",
    marginTop: 20,
  },
  calendarText: {
    fontSize: 16,
    fontFamily: "Inter500",
    textAlign: "center",
  },
  padding: {
    paddingHorizontal: 16,
  },
  popup: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 40,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginRight: 16,
    marginBottom: 16,
  },
  popupText: {
    fontSize: 14,
    color: "#5A5E5E",
    fontFamily: "Inter500",
  },
});

export default Home;
