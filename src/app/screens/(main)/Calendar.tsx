import {
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from "react-native";
import { Stack } from "expo-router";
import { usePathname, useRouter } from "expo-router";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import Members from "../../../components/Members";
import members, { MemberType } from "../../../lib/members";
import {
    getAppointments,
    getDependentIcons,
    getDependents,
} from "../../utils/firebaseUtils";
import { Badge, ListItem } from "@rneui/themed";
import data, { AppointmentType } from "../../../lib/appointments";
import AppointmentCard from "../../../components/AppointmentCard";
import { MarkedDates } from "react-native-calendars/src/types";
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

const CalendarScreen = () => {
    const path = usePathname();
    const router = useRouter();
    const [member, setMember] = useState("fakeID");
    const [day, setDay] = useState("");
    const [markDates, setMarkDates] = useState<MarkedDates>({});
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

    const getMarkedDates = () => {
        const markedDates: MarkedDates = {};

        appointments?.forEach((info, index) => {
            const dateKey = info.date;
            const memberId = info.memberId;
            const colors = [
                "#A3E6C3",
                "#F8DDB5",
                "#9AD6E3",
                "#FFC288",
                "#E1D5F9",
            ];

            const color = colors[Math.floor(Math.random() * colors.length)];

            // If the dateKey is not present in markedDates, initialize it with an empty dots object
            if (!markedDates[dateKey]) {
                markedDates[dateKey] = {
                    dots: [],
                    color: color,
                    selectedColor: color,
                    marked: true,
                    dotColor: color,
                };
            }

            // Add a dot to the dots array for the current member
            if (markedDates[dateKey]?.dots) {
                // Add a dot to the dots array for the current member
                markedDates[dateKey]!.dots!.push({
                    key: `${dateKey}-${memberId} ${Math.random() * 10}`,
                    color: color,
                    selectedDotColor: color,
                });
            }
        });
        console.log(markedDates);
        setMarkDates(markedDates);
    };

    useEffect(() => {
        getMarkedDates();
    }, []);

    console.log(markDates);

    if (loading) {
        return (
            <View style={{ flex: 1 }}>
                <ActivityIndicator size={32} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Calendar",
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

            <View style={styles.memberWrapper}>
                <Calendar
                    markingType='multi-dot'
                    onDayPress={(date) => {
                        setDay(date.dateString);
                        console.log(date.dateString, "DATETTETTE");
                    }}
                    markedDates={markDates}
                />
            </View>

            {Object.keys(dependents).length >= 1 && (
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        borderRadius: 20,
                        backgroundColor: "white",
                        overflow: "hidden",
                    }}
                    data={
                        member == "fakeID"
                            ? appointments
                            : appointments?.filter(
                                  (item) => item.memberId == member
                              )
                    }
                    renderItem={({ item }) => {
                        const userIcon = dependents[item.memberId].icon;
                        return (
                            <ListItem
                                bottomDivider
                                containerStyle={{ padding: 0 }}>
                                <ListItem.Content>
                                    <AppointmentCard
                                        data={item}
                                        icon={userIcon}
                                    />
                                </ListItem.Content>
                            </ListItem>
                        );
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: "#F5F7F7",
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
});
export default CalendarScreen;
