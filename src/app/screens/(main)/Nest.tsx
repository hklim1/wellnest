import {
    Text,
    View,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { Stack } from "expo-router";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Members from "../../../components/Members";
import {
    getAppointments,
    getDependentIcons,
    getDependents,
} from "../../utils/firebaseUtils";
import { Button } from "@rneui/themed";
import { AppointmentType } from "../../../lib/appointments";
import HeaderRight from "../../../components/HeaderRight";
import { getUserId } from "../../utils/globalStorage";
const last = {
    id: "fakeID",
    name: "All",
    firstName: "All",
    icon: "all",
    email: "maria@gmail.com",
    color: "#0FA6B0",
};

const Nest = () => {
    const [member, setMember] = useState("fakeID");
    const [dependents, setDependents] = useState({});
    const [loading, setLoading] = useState(false);
    const [appointments, setAppointments] = useState<AppointmentType[]>();

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
                    setDependents({ ...result, LAST: last });
                }
            } else {
                console.warn("ID dont exist");
            }
        };
        const getData = async () => {
            const result = await getAppointments();
            setAppointments(Object.values(result));
            console.log(Object.values(result));
        };

        getData();
        getInfo();
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size={32} />
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Nest",
                    headerTitleStyle: {
                        fontFamily: "Inter600",
                        fontSize: 16,
                    },
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerStyle: {
                        backgroundColor: "#F5F7F7",
                    },
                    headerRight: () => (
                        <View style={{ paddingRight: 16 }}>
                            <HeaderRight />
                        </View>
                    ),
                }}
            />

            <View>
                <Members
                    members={Object.values(dependents)}
                    setActiveMember={setMember}
                    activeMember={member}
                />
            </View>

            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <Text style={styles.cardTitle}>Today's Appointments</Text>
                    <Ionicons
                        name='ellipsis-vertical'
                        size={24}
                        color='black'
                    />
                </View>
                <View>
                    {Object.keys(dependents).length >= 1 &&
                        appointments
                            ?.filter(
                                (app) =>
                                    new Date().toUTCString().slice(0, 10) ==
                                    new Date(app.date)
                                        .toUTCString()
                                        .slice(0, 10)
                            )
                            .map((app, index) => {
                                return (
                                    <View
                                        style={[
                                            styles.cardTop,
                                            styles.itemRow,
                                            index == 0 && {
                                                backgroundColor: "#E7F6F7",
                                            },
                                        ]}>
                                        <Text>{app.title}...</Text>
                                        <Text>
                                            {app.formattedDate.slice(0, 11)} at{" "}
                                            {app.time}
                                        </Text>
                                    </View>
                                );
                            })}
                </View>
                <View style={styles.btnRow}>
                    <Button
                        title='Rescheduled'
                        style={styles.btn}
                        buttonStyle={styles.btn}
                    />
                    <Button title='Attended' buttonStyle={styles.btn} />
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <Text style={styles.cardTitle}>Today's Medications</Text>
                    <Ionicons
                        name='ellipsis-vertical'
                        size={24}
                        color='black'
                    />
                </View>
            </View>

            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <Text style={styles.cardTitle}>All Medication Updates</Text>
                    <Ionicons
                        name='ellipsis-vertical'
                        size={24}
                        color='black'
                    />
                </View>

                <View style={[styles.cardTop, styles.editStrip]}>
                    <Text style={styles.editText}>VIEW AND EDIT</Text>
                    <Feather name='chevron-right' size={24} color='#0FA6B0' />
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#F5F7F7",
        gap: 16,
        flexDirection: "column",
    },
    memberWrapper: {
        marginVertical: 16,
    },
    iconWrapper: {
        flexDirection: "row",
        gap: 16,
        paddingRight: 20,
    },
    badge: {
        position: "absolute",
        right: 0,
        top: 0,
    },
    card: {
        width: "100%",
        minHeight: 150,
        backgroundColor: "white",
        borderRadius: 10,
        padding: 16,
        marginVertical: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontFamily: "Inter600",
    },
    cardTop: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    itemRow: {
        backgroundColor: "#EEF1F1",
        padding: 10,
        borderRadius: 100,
        marginTop: 10,
    },
    btn: {
        width: 160,
    },
    btnRow: {
        marginTop: 10,
        gap: 10,
        flexDirection: "row",
    },
    editStrip: {
        position: "absolute",
        padding: 16,
        bottom: 0,
        width: "100%",
        left: 16,
        borderTopColor: "#aaa",
        borderTopWidth: 1,
    },
    editText: {
        color: "#0FA6B0",
        fontSize: 14,
        fontFamily: "Inter500",
    },
});
export default Nest;
