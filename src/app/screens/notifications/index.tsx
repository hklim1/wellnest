import { Text, StyleSheet, View, ScrollView } from "react-native";
import { Stack } from "expo-router";

const Notifications = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen
                options={{
                    title: "My Notifications",
                    headerShown: true,
                    headerTitleAlign: "center",
                }}
            />
            <Text>You Have no Notifications Today.</Text>
            <Text> But I may be lying...</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F7F7",
        gap: 15,
        justifyContent: "center",
        alignItems: "center",
    },
});

export default Notifications;
