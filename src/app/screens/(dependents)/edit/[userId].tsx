import React, { useEffect, useState } from "react";
import { firebaseDB } from "../../../../../FirebaseConfig";
import DatePicker from "react-native-modern-datepicker";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    ScrollView,
    ActivityIndicator,
} from "react-native";
import { Button, Overlay } from "@rneui/themed";
import {
    getDependentIcons,
    useDependentIds,
} from "../../../utils/firebaseUtils";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { BottomSheet } from "@rneui/themed";
import { UserIcon } from "../../../../components/UserIcons";
import TextInputLabel from "../../../../components/TextInputLabel";
import Toast from "react-native-root-toast";
import { Dialog } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";
import { MemberType } from "../../../../lib/members";
import {
    removeUserFromPermissions,
    editDependent,
} from "../../../utils/firebaseUtils";
import { getUserId } from "../../../utils/globalStorage";
const allIcons = [
    "cow",
    "gorilla",
    "koala",
    "alligator",
    "pig",
    "fox",
    "bear",
    "penguin",
    "frog",
    "lion",
];

export default function EditDependentScreen() {
    const { userId } = useLocalSearchParams();
    const userIdValue = userId as string;
    // const currentMember = members[userIdValue - 1];
    const {} = useDependentIds(userIdValue);
    const [currentMember, setCurrentMember] = useState<MemberType>();
    const [dFirstName, setFirstName] = useState("");
    const [dDateOfBirth, setDateOfBirth] = useState("");
    const [dGender, setGender] = useState("");
    const [dNotes, setNotes] = useState("");
    const [dIcon, setIcon] = useState("");
    const [open, setOpen] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [loading, setLoading] = useState(true);
    const genderOptions = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Prefer Not to Specify", value: "N/A" },
    ];

    console.log(firebaseDB);

    useEffect(() => {
        setLoading(true);
        const getData = async () => {
            const member = await getDependentIcons([userIdValue]);
            console.log(member);
            console.log(
                "========================================================="
            );
            if (member) {
                setCurrentMember(Object.values(member)[0]);
                setFirstName(member[userIdValue]?.firstName || "");
                setDateOfBirth(member[userIdValue]?.dateOfBirth || "");
                setGender(member[userIdValue]?.gender || "");
                setNotes(member[userIdValue]?.notes || "");
                setIcon(member[userIdValue]?.icon || "");
            }
            setLoading(false);
        };

        getData();
    }, [userIdValue]); // Adding userIdValue to the dependency array

    const toggleCalendar = () => setOpenCalendar(!openCalendar);

    // implement edit dependent function
    const editDependentUser = async () => {
        await editDependent(
            userIdValue, // Assuming currentMember has an "id" property
            dFirstName,
            dDateOfBirth,
            dGender,
            dNotes,
            dIcon
        );
        Toast.show("Dependent has been edited", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
        });
        router.back();
    };

    const deleteDependent = async () => {
        const owner_id = await getUserId();
        await removeUserFromPermissions(owner_id as string, userIdValue);
        Toast.show("Dependent has been deleted", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
        });
        router.back();
    };

    if (loading) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                <ActivityIndicator size={32} />
                <Text style={styles.overlayText}>Loading Data</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Edit Dependent Member",
                    headerShown: true,
                    headerLeft: () => (
                        <Text
                            onPress={() => router.back()}
                            style={{
                                color: "#4B86ED",
                                fontFamily: "Inter400",
                            }}>
                            Cancel
                        </Text>
                    ),
                    headerTitleAlign: "center",
                    headerTitleStyle: {
                        fontSize: 16,
                        fontFamily: "Inter600",
                    },
                    headerStyle: { backgroundColor: "#EFF4F4" },
                    headerRight: () => (
                        <Text
                            onPress={() => setOpenDelete(true)}
                            style={{ color: "#E35454" }}>
                            Delete
                        </Text>
                    ),
                }}
            />

            <View style={styles.imageContainer}>
                <Pressable
                    style={styles.imageWrapper}
                    onPress={() => setOpen(true)}>
                    <UserIcon name={dIcon + "Plus"} width={60} height={60} />
                </Pressable>
            </View>

            <View style={{ gap: 24 }}>
                <TextInputLabel
                    label='Name'
                    value={dFirstName}
                    placeholder='First name'
                    autoCapitalize='none'
                    onChangeText={(newText) => setFirstName(newText)}
                />
                <TextInputLabel
                    onPressIn={toggleCalendar}
                    label='Date Of Birth'
                    value={dDateOfBirth}
                    placeholder='Date of Birth'
                    autoCapitalize='none'
                    onChangeText={(newText) => setDateOfBirth(newText)}
                />
                <Dialog
                    overlayStyle={{ padding: 0 }}
                    presentationStyle='overFullScreen'
                    isVisible={openCalendar}
                    onBackdropPress={toggleCalendar}>
                    <DatePicker
                        mode='calendar'
                        onDateChange={(date) => setDateOfBirth(date)}
                    />
                    <View style={{ padding: 16 }}>
                        <Button onPress={toggleCalendar} title='Save' />
                    </View>
                </Dialog>

                <View>
                    <Text style={styles.label}>Gender</Text>
                    <Dropdown
                        placeholder='Select Gender'
                        style={{
                            backgroundColor: "white",
                            paddingHorizontal: 16,
                            paddingVertical: 8,
                            borderRadius: 10,
                        }}
                        itemTextStyle={{ color: "#1A1D1D" }}
                        selectedTextStyle={{ color: "#1A1D1D" }}
                        valueField='value'
                        labelField='label'
                        value={dGender}
                        data={genderOptions}
                        onChange={(item) => {
                            setGender(item.value);
                        }}
                    />
                </View>
                <TextInputLabel
                    label='Notes'
                    multiline
                    value={dNotes}
                    style={{ height: 100 }}
                    placeholder='Notes'
                    autoCapitalize='none'
                    onChangeText={(newText) => setNotes(newText)}
                />

                <Button onPress={editDependentUser}>Save Edits</Button>
            </View>

            {/* OVERLAY */}
            <Overlay
                isVisible={openDelete}
                overlayStyle={styles.overlayContainer}>
                <Text style={styles.overlayTitle}>Delete Dependent Member</Text>
                <Text style={styles.overlayText}>
                    Are you sure you want to delete the selected dependent
                    member?
                </Text>
                <View style={styles.buttonRow}>
                    <Button
                        onPress={deleteDependent}
                        title='Delete'
                        buttonStyle={styles.overlayButton}
                        titleStyle={{ color: "#E35454" }}
                    />
                    <Button
                        onPress={() => setOpenDelete(false)}
                        title='Cancel'
                        buttonStyle={styles.overlayButton}
                        titleStyle={{ color: "black" }}
                    />
                </View>
            </Overlay>
            <BottomSheet
                isVisible={open}
                onBackdropPress={() => {
                    setOpen(false);
                }}>
                <View style={styles.bottomSheet}>
                    <View style={{ alignItems: "center" }}>
                        <View style={styles.topBar} />
                    </View>
                    <Text style={styles.bottomSheetTitle}>
                        Select A Profile Icon
                    </Text>
                    <View style={{ alignItems: "center", marginTop: 16 }}>
                        <FlatList
                            nestedScrollEnabled
                            numColumns={5}
                            columnWrapperStyle={{ gap: 16 }}
                            contentContainerStyle={{ gap: 16 }}
                            data={allIcons}
                            renderItem={({ item }) => {
                                return (
                                    <Pressable onPress={() => setIcon(item)}>
                                        <UserIcon
                                            name={
                                                dIcon == item
                                                    ? item + "Selected"
                                                    : item + "Circle"
                                            }
                                            width={50}
                                            height={50}
                                        />
                                    </Pressable>
                                );
                            }}
                        />
                    </View>
                    <Button
                        title='Save'
                        buttonStyle={{ marginTop: 20 }}
                        onPress={() => setOpen(false)}
                    />
                </View>
            </BottomSheet>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        marginBottom: 16,
        backgroundColor: "#EFF4F4",
    },
    badge: {
        borderRadius: 100,
        backgroundColor: "#0FA6B0",
        width: 20,
        height: 20,
        position: "absolute",
        bottom: 2,
        right: 0,
        padding: 2,
    },
    imageWrapper: {
        marginTop: 20,
        justifyContent: "center",
        width: 60,
        height: 60,
        backgroundColor: "white",
        alignItems: "center",
        padding: 10,
        borderRadius: 100,
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16,
    },
    bottomSheet: {
        flex: 1,
        backgroundColor: "#EFF4F4",
        height: 370,
        borderTopEndRadius: 20,
        borderTopLeftRadius: 20,
        padding: 16,
        // justifyContent: "space-between",
        gap: 24,
    },
    bottomSheetTitle: {
        textAlign: "center",
        fontFamily: "Inter600",
        fontSize: 16,
    },
    label: {
        fontSize: 14,
        fontFamily: "Inter400",
        paddingLeft: 16,
        marginBottom: 8,
    },
    topBar: {
        width: 50,
        height: 3,
        borderRadius: 100,
        backgroundColor: "#D3D3D3",
        margin: "auto",
    },
    overlayContainer: {
        borderRadius: 10,
        paddingHorizontal: 32,
        paddingVertical: 16,
        width: 330,
        gap: 20,
    },
    overlayTitle: {
        fontSize: 16,
        fontFamily: "Inter500",
        textAlign: "center",
        color: "#1A1D1D",
    },
    overlayText: {
        fontSize: 16,
        fontFamily: "Inter400",
        color: "#4F5252",
        textAlign: "center",
        marginBottom: 10,
    },
    buttonRow: {
        flexDirection: "row",
        gap: 16,
    },
    overlayButton: {
        paddingHorizontal: 43,
        paddingVertical: 12,
        backgroundColor: "#EFF4F4",
    },
});
