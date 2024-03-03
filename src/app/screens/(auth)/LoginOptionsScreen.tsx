import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { Link, Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Button, ThemeProvider } from "@rneui/themed";
import { AppTheme, useStyles } from "../../themes";
import { firebaseAuth } from "../../../../FirebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
} from "firebase/auth";

export default function LoginOptionsScreen() {
    const themeStyle = useStyles();
    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <View style={styles.basicContainer}>
                <Text>Open up App.tsx to start working on your app!</Text>
                <Link
                    href='screens/WelcomeScreen'
                    style={{ margin: 20, color: "blue" }}>
                    Settings
                </Link>
            </View>
            <View style={styles.buttonsContainer}>
                <Button>Sign Up</Button>
                <Button type='outline'>Login</Button>
            </View>
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    basicContainer: {
        flex: 1,
    },
    buttonsContainer: {
        width: 300,
        paddingVertical: 100,
        // position: "absolute",
        // top: 70,
    },
    input: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10,
    },
});
