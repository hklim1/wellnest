import React, { useState } from "react";
import { Stack, router } from "expo-router";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Button, ListItem } from "@rneui/themed";

const SelectUsageScreen = () => {
  const [oneTimeSelected, setOneTimeSelected] = useState(false);
  const [longTermSelected, setLongTermSelected] = useState(false);
  return (
    <SafeAreaView
      style={{
        backgroundColor: "#eff4f4",
      }}
    >
      <ScrollView style={{ backgroundColor: "#eff4f4", height: "100%" }}>
        <View style={styles.headerContainer}>
          <Stack.Screen
            options={{
              headerBackTitle: "Cancel",
              headerShown: true,
              title: "Medication",
              headerTitleStyle: {
                fontSize: 16,
                fontFamily: "Inter600",
              },
              headerStyle: {
                backgroundColor: "#eff4f4",
              },
              headerTitleAlign: "center",
              headerLeft: () => (
                <Pressable onPress={() => router.back()}>
                  <Text style={styles.textButtons}>Cancel</Text>
                </Pressable>
              ),
              headerShadowVisible: false,
            }}
          />
        </View>
        <View style={styles.bodyContainer}>
          <Text style={{ fontFamily: "Inter500", fontSize: 20 }}>
            Choose your usage:
          </Text>
          <View style={{ marginTop: 16 }}>
            <>
              <Pressable
                onPress={() => {
                  setOneTimeSelected(true);
                  setLongTermSelected(false);
                }}
              >
                <ListItem
                  containerStyle={{
                    borderTopEndRadius: 10,
                    borderTopStartRadius: 10,
                    paddingHorizontal: 16,
                    paddingTop: 11,
                    paddingBottom: 12,
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.listTitles}>
                      One-time use
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        position: "absolute",
                        right: 0,
                        opacity: oneTimeSelected ? 1 : 0,
                      }}
                    >
                      <Feather name="check" size={18} color="black" />
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </Pressable>
              <Pressable
                onPress={() => {
                  setOneTimeSelected(false);
                  setLongTermSelected(true);
                }}
              >
                <ListItem
                  topDivider
                  containerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 11,
                    paddingBottom: 12,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <ListItem.Content>
                    <ListItem.Title style={styles.listTitles}>
                      Long-term use
                    </ListItem.Title>
                    <ListItem.Subtitle
                      style={{
                        position: "absolute",
                        right: 0,
                        opacity: longTermSelected ? 1 : 0,
                      }}
                    >
                      <Feather name="check" size={18} color="black" />
                    </ListItem.Subtitle>
                  </ListItem.Content>
                </ListItem>
              </Pressable>
            </>
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <Button
          style={{ width: "100%" }}
          titleStyle={{ fontFamily: "Inter500", fontSize: 16 }}
          onPress={
            oneTimeSelected
              ? () => router.push("/screens/medication/OneTimeInputScreen")
              : () => router.push("/screens/WelcomeScreen")
          }
        >
          Next
        </Button>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  bodyContainer: {
    backgroundColor: "#eff4f4",
    height: "100%",
    paddingHorizontal: 16,
    marginTop: 95,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 56,
    width: "90%",
    display: "flex",
    alignSelf: "center",
  },
  headerContainer: {
    paddingTop: 16,
    marginTop: 16,
  },
  listTitles: {
    fontFamily: "Inter400",
    fontSize: 16,
  },
  textButtons: {
    fontFamily: "Inter400",
    color: "#4B86ED",
    fontSize: 16,
  },
});

export default SelectUsageScreen;
