import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Alert } from "react-native";
import { Calendar } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
const UserCalendar = () => {
    const [day, setDay] = useState<string>("");
    const [app, setApp] = useState("");

    const onScreenFocus = useCallback(() => {
        console.log("Screen is seen, refreshing...");
        getAppointments();
    }, []);

    useFocusEffect(onScreenFocus);

    const getAppointments = async () => {
        try {
            const value = await AsyncStorage.getItem("appointment");
            const result = value == null ? null : JSON.parse(value);

            console.log(result);
            setApp(result);
            return result;
        } catch (err) {
            Alert.alert("I like to code");
        }
    };
    return (
        <ScrollView>
            <View style={styles.wrapper}>
                <Calendar
                    hideExtraDays={true}
                    enableSwipeMonths={true}
                    markingType='dot'
                    onDayPress={(day) => setDay(day.dateString)}
                    markedDates={{
                        [day]: {
                            color: "red",
                            activeOpacity: 0.5,
                            selected: true,
                            marked: true,
                            selectedColor: "red",
                        },
                    }}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 30,
    },
    wrapper: {
        borderRadius: 10,
        backgroundColor: "white",
        padding: 10,
    },
});
export default UserCalendar;
