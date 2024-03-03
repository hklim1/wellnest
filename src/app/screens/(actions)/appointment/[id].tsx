import { useState, useEffect } from "react";
import {
    Text,
    View,
    SafeAreaView,
    TextInput,
    ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { AppointmentType } from "../../../../lib/appointments";
import TextInputIcon from "../../../../components/TextInputIcon";
import ComponentDivider from "../../../../components/ComponentDivider";
import { UserIcon } from "../../../../components/UserIcons";
import { getAppointmentById } from "../../../utils/firebaseUtils";
import { Button } from "@rneui/themed";

const AppointmentDetails = () => {
    const { id, icon } = useLocalSearchParams();
    const value = id as string;
    const iconVal = icon as string;
    const [appointment, setAppointment] = useState<AppointmentType>();
    const [loading, setLoading] = useState(false);
    const [editable, setEditable] = useState(false);

    const toggleEdit = () => setEditable(!editable);

    useEffect(() => {
        const getData = async () => {
            setLoading(true);
            const appt = await getAppointmentById(value);
            setAppointment(appt);
            setLoading(false);
        };

        getData();
    }, []);

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                }}>
                <ActivityIndicator size={50} />
                <Text>Loading Data...</Text>
            </View>
        );
    }
    return (
        <SafeAreaView style={{ padding: 16, flex: 1 }}>
            <Stack.Screen
                options={{
                    headerRight: () => (
                        <Text
                            onPress={toggleEdit}
                            style={{ color: "blue", fontFamily: "Inter400" }}>
                            Edit
                        </Text>
                    ),
                    title: "Appointment Details",
                    headerTitleAlign: "center",
                    headerShadowVisible: false,
                    headerShown: true,
                    headerTitleStyle: {
                        fontFamily: "Inter600",
                        fontSize: 16,
                    },
                    headerStyle: {
                        backgroundColor: "transparent",
                    },
                }}
            />

            <ComponentDivider>
                <View
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: 8,
                        gap: 8,
                        padding: 8,
                    }}>
                    <UserIcon name={iconVal + "Circle"} width={24} />

                    <TextInput
                        defaultValue={appointment?.title}
                        editable={editable}
                        style={{
                            fontSize: 18,
                            fontFamily: "Inter500",
                            color: "black",
                        }}
                    />
                </View>
                <TextInputIcon
                    name='clock'
                    defaultValue={
                        appointment?.formattedDate + " at " + appointment?.time
                    }
                    editable={editable}
                    color='#1A1D1D'
                />
                <TextInputIcon
                    name='bell'
                    defaultValue={appointment?.reminder}
                    editable={editable}
                    color='#1A1D1D'
                />
                <TextInputIcon
                    name='map-pin'
                    defaultValue={appointment?.location}
                    editable={editable}
                    color='#1A1D1D'
                />
                <TextInputIcon
                    name='phone'
                    defaultValue={appointment?.phone}
                    editable={editable}
                    color='#1A1D1D'
                />
                <TextInputIcon
                    name='menu'
                    defaultValue={appointment?.notes}
                    editable={editable}
                    color='#1A1D1D'
                />
            </ComponentDivider>

            {editable && <Button title={"Save Edits"} />}
        </SafeAreaView>
    );
};

export default AppointmentDetails;
