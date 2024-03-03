import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link, Stack, useRouter } from "expo-router";
import { Button, Icon, ListItem } from "@rneui/themed";
import { MemberType } from "../../../lib/members";
import MemberRow from "../../../components/MemberRow";
import ComponentDivider from "../../../components/ComponentDivider";
import { getDependentIcons, getDependents } from "../../utils/firebaseUtils";
import { getUserId } from "../../utils/globalStorage";
import { useFocusEffect } from "expo-router";

export default function FamilyMembersScreen() {
    const [dependents, setDependents] = useState({});
    const router = useRouter();
    const depValues = Object.values(dependents) as MemberType[];
    const [userId, setUserId] = useState("");

    // to refetch data when screen gets focused again
    useFocusEffect(
        useCallback(() => {
            const getData = async () => {
                const user_id = await getUserId();
                const deps = await getDependents(user_id as string);
                const depArray = Object.keys(deps);
                const depsInfo = await getDependentIcons(depArray);

                if (depsInfo) {
                    console.log(depsInfo);
                    setDependents(depsInfo);
                }

                setUserId(user_id as string);
            };

            getData();
        }, [])
    );
    return (
        <View style={styles.background}>
            <Stack.Screen
                options={{
                    headerBackTitle: "Cancel",
                    headerShown: true,
                    title: "Settings",
                    headerTitleStyle: { fontSize: 16, fontWeight: "500" },
                    headerTitleAlign: "center",
                    headerLeft: () => (
                        <Button
                            type='clear'
                            onPress={() => router.back()}
                            title={"  "}
                            icon={
                                <Icon
                                    name='chevron-left'
                                    color='black'
                                    size={30}
                                />
                            }
                        />
                    ),
                    headerShadowVisible: false,
                }}
            />
            <View>
                <Text style={styles.accountMembersTitle}>ACCOUNT MEMBERS</Text>

                <ComponentDivider>
                    {depValues.map((dep, index) => {
                        const match = userId == dep.id;

                        const matched = (
                            <Text style={{ color: "grey" }}>Owner</Text>
                        );
                        const unMatched = (
                            <Text style={{ color: "red" }}>Remove</Text>
                        );

                        const value = match ? matched : unMatched;
                        if (match) {
                            return (
                                <MemberRow
                                    key={index}
                                    name={dep.firstName}
                                    imageName={dep.icon}
                                    rightComponent={value}
                                />
                            );
                        }
                    })}

                    <View
                        style={{
                            flexDirection: "row",
                            padding: 16,
                            alignItems: "center",
                            gap: 10,
                        }}>
                        <Feather name='plus-circle' size={24} />
                        <Text>Add Account Member</Text>
                    </View>
                </ComponentDivider>
            </View>
            <View>
                <Text style={styles.accountMembersTitle}>
                    DEPENDENT MEMBERS
                </Text>
                <ComponentDivider>
                    {depValues.map((dep) => {
                        if (dep.id != userId) {
                            return (
                                <MemberRow
                                    key={
                                        dep.id + Math.floor(Math.random() * 10)
                                    }
                                    imageName={dep.icon}
                                    name={dep.firstName}
                                    rightComponent={
                                        <Link href={`/screens/edit/${dep.id}`}>
                                            <Text
                                                style={[
                                                    styles.text,
                                                    styles.editText,
                                                ]}>
                                                Edit
                                            </Text>
                                        </Link>
                                    }
                                />
                            );
                        }
                    })}
                    <ListItem
                        onPress={() =>
                            router.navigate("/screens/AddDependentScreen")
                        }>
                        <Feather name='plus-circle' size={24} />
                        <Text>Add Dependent Member</Text>
                    </ListItem>
                </ComponentDivider>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        fontFamily: "Inter400",
        fontSize: 16,
    },
    accountMembersTitle: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: "Inter400",
        paddingLeft: 16,
    },
    removeText: {
        color: "#E13F3F",
    },
    editText: {
        color: "#4B86ED",
    },
    background: {
        flex: 1,
        padding: 16,
        backgroundColor: "#EFF4F4",
        gap: 20,
    },
    header: {
        flex: 1,
        borderWidth: 2,
        borderColor: "black",
        height: 30,
        position: "absolute",
        top: 50,
    },
    listSubtitles: {
        position: "absolute",
        right: 0,
        padding: 0,
        margin: 0,
        color: "grey",
    },
    manageMembers: {},
    itemWrapper: {
        flexDirection: "row",
        alignItems: "center",
    },
});
