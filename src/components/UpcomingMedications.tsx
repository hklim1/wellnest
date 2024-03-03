import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Button } from "@rneui/themed";

interface Medicine {
    meds: {
        name: string;
        time: string;
        amount: string;
        weight: string;
    };
}
const medications = [
    { name: "Levonorgestrel", time: "9:30", amount: "1 pill", weight: "15mg" },
    { name: "Levonorgestrel", time: "9:30", amount: "1 pill", weight: "15mg" },
    { name: "Levonorgestrel", time: "9:30", amount: "1 pill", weight: "15mg" },
    { name: "Levonorgestrel", time: "9:30", amount: "1 pill", weight: "15mg" },
];
const UpcomingMedications = () => {
    return (
        <View>
            <FlatList
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap: 10,
                    paddingHorizontal: 16,
                }}
                horizontal
                data={medications}
                renderItem={({ item }) => <MedicationCard meds={item} />}
            />
        </View>
    );
};

const MedicationCard = ({ meds }: Medicine) => {
    return (
        <View style={styles.card}>
            <View style={styles.cardWrapper}>
                <View style={styles.cardIconWrapper}>
                    <MaterialCommunityIcons name='pill' size={35} />
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.topWrapper}>
                        <Text style={styles.text}>{meds.name}</Text>
                        <Ionicons
                            name='ellipsis-vertical'
                            size={24}
                            color='black'
                        />
                    </View>
                    <View>
                        <Text style={styles.cardDetails}>
                            {meds.amount} • {meds.weight} • {meds.time}
                        </Text>
                        <View style={styles.buttonWrapper}>
                            <Button
                                titleStyle={styles.buttonText}
                                buttonStyle={styles.button}
                                title='Skipped'></Button>
                            <Button
                                buttonStyle={styles.button}
                                titleStyle={styles.buttonText}
                                title='Taken'></Button>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        padding: 16,
        borderRadius: 10,
        width: 300,
    },
    cardIconWrapper: {
        backgroundColor: "#EEF1F1",
        width: 50,
        height: 50,
        justifyContent: "center",
        borderRadius: 100,
        alignItems: "center",
    },
    cardWrapper: {
        flexDirection: "row",
        gap: 16,
        alignItems: "center",
    },
    topWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    text: {
        fontSize: 16,
        fontFamily: "Inter400",
    },
    buttonWrapper: {
        flexDirection: "row",
        gap: 10,
        marginTop: 10,
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 10,
        color: "white",
        fontFamily: "Inter100",
    },
    buttonText: {
        fontFamily: "Inter500",
    },
    cardDetails: {
        color: "#979B9B",
        fontSize: 14,
        fontFamily: "Inter400",
    },
});

export default UpcomingMedications;
