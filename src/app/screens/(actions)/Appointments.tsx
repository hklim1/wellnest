import { Text, View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import { Stack, useRouter } from "expo-router";
import ComponentDivider from "../../../components/ComponentDivider";
import TextInputIcon from "../../../components/TextInputIcon";
import { Button, ListItem, Dialog } from "@rneui/themed";
import Members from "../../../components/Members";
import { Calendar } from "react-native-calendars";
import { useEffect, useState } from "react";
import DatePicker from "react-native-modern-datepicker";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserId } from "../../utils/globalStorage";
import {
    getDependentIcons,
    getDependents,
    addAppointments,
} from "../../utils/firebaseUtils";
import Toast from "react-native-root-toast";

const options = [
    { title: "None", value: 0 },
    { title: "15 mins before", value: 15 },
    { title: "30 mins before", value: 30 },
    { title: "1 hour before", value: 60 },
    { title: "1 day before", value: 1440 },
];
const Appointments = () => {
    const [openCalender, setOpenCalender] = useState(false);
    const [date, setDate] = useState(new Date().toDateString());
    const [time, setTime] = useState("");
    const [openTime, setOpenTime] = useState(false);
    const [openReminder, setOpenReminder] = useState(false);
    const [reminder, setReminder] = useState("");
    const [title, setTitle] = useState("");
    const [location, setLocation] = useState("");
    const [number, setNumber] = useState("");
    const [note, setNotes] = useState("");
    const [activeMember, setActiveMember] = useState("");
    const [dependents, setDependents] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getInfo = async () => {
            const id = await getUserId();
            if (id) {
                const deps = await getDependents(id);
                console.log(deps);
                const result = await getDependentIcons(Object.keys(deps));
                console.log("============ result is", result);
                if (result) {
                    setDependents(result);
                }
            } else {
                console.warn("ID dont exist");
            }
        };

        getInfo();
        setLoading(false);
    }, []);

    const router = useRouter();

    const storeData = async () => {
        try {
            const data = {
                // id gets updated in utils so no worries
                _id: 0,
                title: title,
                date: date,
                time: time,
                reminder: reminder,
                location: location,
                phone: number,
                notes: note,
                memberId: activeMember,
                formattedDate: new Date(date).toUTCString().slice(0, 16),
            };
            await addAppointments(data);
            Toast.show("New Appointment Has been created!");
            const serializedData = JSON.stringify(data);
            await AsyncStorage.setItem("appointment", serializedData);
            router.back();
        } catch (err) {
            Alert.alert("Failed to save data");
        }
    };

    const handleReminderChange = (idx: number) => {
        options.forEach((option) => {
            if (option.value == idx) {
                setReminder(option.title);
            }
        });
    };
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    headerBackTitle: "Cancel",
                    headerShown: true,
                    title: "New Appointment",
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Text
                            onPress={() => router.back()}
                            style={styles.navText}>
                            Cancel
                        </Text>
                    ),
                    headerRight: () => (
                        <Text onPress={storeData} style={styles.navText}>
                            Save
                        </Text>
                    ),
                    headerShadowVisible: false,
                }}
            />

            <ComponentDivider>
                <TextInputIcon
                    name='edit'
                    placeholder='Add Title'
                    value={title}
                    onChangeText={(text) => setTitle(text)}
                    maxLength={20}
                />
                <TextInputIcon
                    name='calendar'
                    placeholder='Date'
                    value={new Date(date).toUTCString().slice(0, 16)}
                    onPressIn={() => setOpenCalender(true)}
                />
                {openCalender && (
                    <Calendar
                        minDate={new Date().toDateString()}
                        markedDates={{
                            [date]: {
                                color: "#0FA6B0",
                                activeOpacity: 0.5,
                                selected: true,
                                marked: true,
                                selectedColor: "#0FA6B0",
                            },
                        }}
                        onDayPress={(date) => {
                            console.log(new Date(date.dateString));
                            setDate(date.dateString);
                            setOpenCalender(false);
                        }}
                    />
                )}
                <TextInputIcon
                    name='clock'
                    placeholder='Time'
                    value={time}
                    onPressIn={() => setOpenTime(true)}
                />
                {openTime && (
                    <DatePicker
                        mode='time'
                        minuteInterval={5}
                        onTimeChange={(selectedTime) => {
                            setTime(selectedTime);
                            setOpenTime(false);
                        }}
                    />
                )}
            </ComponentDivider>

            <ComponentDivider>
                <TextInputIcon
                    name='bell'
                    placeholder='Reminders'
                    value={reminder}
                    onPressIn={() => setOpenReminder(true)}
                />
                {openReminder && (
                    <Dialog onBackdropPress={() => setOpenReminder(false)}>
                        {options.map((option, index) => {
                            const icon =
                                option.title == reminder ? "check" : undefined;
                            return (
                                <ListItem
                                    key={index}
                                    bottomDivider
                                    onPress={() => {
                                        handleReminderChange(option.value);
                                        setOpenReminder(false);
                                    }}>
                                    <ListItem.Content
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "flex-start",
                                            alignItems: "center",
                                            gap: 10,
                                        }}>
                                        <View style={{ width: 30 }}>
                                            <Feather name={icon} size={24} />
                                        </View>
                                        <Text>{option.title}</Text>
                                    </ListItem.Content>
                                </ListItem>
                            );
                        })}
                    </Dialog>
                )}
                <TextInputIcon
                    name='map-pin'
                    placeholder='Location'
                    value={location}
                    onChangeText={(text) => setLocation(text)}
                />
                <TextInputIcon
                    name='phone'
                    placeholder='Phone Number'
                    value={number}
                    onChangeText={(text) => setNumber(text)}
                    inputMode='tel'
                />
            </ComponentDivider>

            <ComponentDivider>
                <TextInputIcon
                    name='menu'
                    multiline={true}
                    placeholder='Add a note'
                    value={note}
                    onChangeText={(text) => setNotes(text)}
                    maxLength={100}
                />
            </ComponentDivider>

            {loading ? (
                <View>
                    <ActivityIndicator size={40} />
                    <Text>Loading</Text>
                </View>
            ) : (
                <View>
                    {Object.keys(dependents).length >= 1 && (
                        <>
                            <Text style={styles.text}>This is for: </Text>
                            <Members
                                activeMember={activeMember}
                                setActiveMember={setActiveMember}
                                members={Object.values(dependents)}
                            />
                        </>
                    )}
                </View>
            )}

            <Button onPress={storeData}>Save</Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        gap: 30,
    },
    button: {
        backgroundColor: "#777777",
        borderRadius: 10,
        paddingVertical: 16,
    },
    text: {
        fontSize: 16,
    },
    navText: { fontSize: 16, color: "#4B86ED" },
});
export default Appointments;
