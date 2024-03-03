import React, { useState } from "react";
import { firebaseDB } from "../../../../FirebaseConfig";

import DatePicker from "react-native-modern-datepicker";
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    FlatList,
    ScrollView,
} from "react-native";
import { Button } from "@rneui/themed";
import { createDependent } from "../../utils/firebaseUtils";
import { Stack, router } from "expo-router";
import { BottomSheet } from "@rneui/themed";
import { UserIcon } from "../../../components/UserIcons";
import TextInputLabel from "../../../components/TextInputLabel";
import Toast from "react-native-root-toast";
import { Dialog } from "@rneui/themed";
import { Dropdown } from "react-native-element-dropdown";

export default function AddDependentScreen() {
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
    const [dFirstName, setFirstName] = useState("");
    const [dDateOfBirth, setDateOfBirth] = useState("");
    const [dGender, setGender] = useState("");
    const [dNotes, setNotes] = useState("");
    const [dIcon, setIcon] = useState("member");
    const [open, setOpen] = useState(false);
    const [openCalendar, setOpenCalendar] = useState(false);
    const genderOptions = [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
        { label: "Prefer Not to Specify", value: "N/A" },
    ];

    console.log(firebaseDB);

    const toggleCalendar = () => setOpenCalendar(!openCalendar);


    const createNewDependent = async () => {
        console.log(dFirstName, dIcon);
        await createDependent(dFirstName, dDateOfBirth, dGender, dNotes, dIcon);
        Toast.show("New Dependent has been added", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
        });
        router.back();
    };

    return (
        <ScrollView style={styles.container}>
            <Stack.Screen
                options={{
                    title: "Add Dependent Member",
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

                <Button onPress={createNewDependent}>Save</Button>
            </View>

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
        alignItems: "center",
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
});
