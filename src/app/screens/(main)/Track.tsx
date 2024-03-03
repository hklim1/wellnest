import { Text, View, StyleSheet } from "react-native";
import { Stack } from "expo-router";

const Track = () => {
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <Text>Tracking Screen</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});
export default Track;
