import React, { ReactNode } from "react";
import { Text, View, StyleSheet } from "react-native";
import { UserIcon } from "./UserIcons";
type Props = {
    imageName: string;
    name: string;
    rightComponent: ReactNode;
};

const MemberRow = ({ imageName, name, rightComponent }: Props) => {
    return (
        <View style={[styles.container, styles.row]}>
            <View style={[styles.row, styles.wrapper]}>
                <UserIcon name={imageName + "Circle"} />
                <View>
                    <Text style={styles.text}>{name}</Text>
                </View>
            </View>
            <View>{rightComponent}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        padding: 16,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    wrapper: {
        gap: 10,
    },
    text: {
        fontFamily: "Inter400",
        fontSize: 16,
    },
});
export default MemberRow;
