import React from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { MemberType } from "../lib/members";
import { UserIcon } from "./UserIcons";

type MemberProps = {
    activeMember: string;
    setActiveMember: React.Dispatch<React.SetStateAction<string>>;
    members: MemberType[];
    numCols?: number;
};

const Members = ({
    activeMember,
    setActiveMember,
    members,
    numCols,
}: MemberProps) => {
    return (
        <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingTop: 10,
                    columnGap: 10,
                }}
                horizontal={!numCols}
                numColumns={numCols}
                data={members}
                renderItem={({ item }) => (
                    <MemberProfile
                        member={item}
                        activeId={activeMember}
                        setActive={setActiveMember}
                    />
                )}
            />
        </View>
    );
};

type Props = {
    member: MemberType;
    activeId: string;
    setActive: React.Dispatch<React.SetStateAction<string>>;
};

const MemberProfile = ({ member, activeId, setActive }: Props) => {
    const handlePress = (id: string) => {
        setActive(id);
    };
    // since the
    const image =
        activeId == member.id
            ? member.icon + "Selected"
            : member.icon + "Circle";
    return (
        <Pressable
            onPress={() => {
                handlePress(member.id);
            }}>
            <UserIcon name={image} width={55} height={55} />
            <Text
                style={[
                    styles.text,
                    activeId == member.id && styles.activeText,
                ]}>
                {member.firstName}
            </Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    member: {},
    text: {
        textAlign: "center",
        color: "#979B9B",
        fontFamily: "Inter500",
        fontSize: 14,
    },
    activeMember: {
        borderWidth: 3,

        padding: 5,
    },
    activeText: {
        color: "black",
    },
    imageWrapper: {
        backgroundColor: "white",
        borderRadius: 100,
        padding: 5,
        borderWidth: 3,
        borderColor: "transparent",
    },
});

export default Members;
