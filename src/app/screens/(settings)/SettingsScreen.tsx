import {
  View,
  Text,
  Pressable,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  PixelRatio,
} from "react-native";
import { Button } from "@rneui/themed";
import { Stack, Link, useRouter, router } from "expo-router";
import { Avatar, Icon, ListItem } from "@rneui/themed";
import { ThemeProvider } from "@react-navigation/native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { UserIcon } from "../../../components/UserIcons";

const SettingsScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView style={styles.background}>
        <Stack.Screen
          options={{
            headerBackTitle: "Cancel",
            headerShown: true,
            title: "Settings",
            headerTitleStyle: {
              fontSize: 16,
              fontWeight: "500",
              fontFamily: "Inter600",
            },
            headerStyle: {
              backgroundColor: "#eff4f4",
            },
            headerTitleAlign: "center",
            headerLeft: () => (
              <Button
                type="clear"
                onPress={() => router.back()}
                title={"  "}
                icon={<Icon name="chevron-left" color="black" size={30} />}
              />
            ),
            headerShadowVisible: false,
          }}
        />
        <View style={styles.membersContainer}>
          <View>
            <Text style={styles.sectionTitles}>MAIN ACCOUNT</Text>
            <>
              <ListItem
                containerStyle={{
                  borderRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <UserIcon name="bear" height={20} width={20} />
                <ListItem.Content
                  style={{
                    height: 21,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <ListItem.Title style={{ paddingLeft: 0, margin: 0 }}>
                    Maria
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubtitles}>
                    <Feather name="chevron-right" size={18} />
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitles}>MEMBERS</Text>
            <>
              <Pressable
                onPress={() => router.push("/screens/FamilyMembersScreen")}
              >
                <ListItem
                  // bottomDivider
                  containerStyle={{
                    borderRadius: 10,
                    paddingHorizontal: 16,
                    paddingTop: 11,
                    paddingBottom: 12,
                  }}
                >
                  <Feather name="users" size={20} color="black" />
                  <ListItem.Content
                    style={{ height: 21, padding: 0, margin: 0 }}
                  >
                    <ListItem.Title
                      style={{
                        margin: 0,
                        fontFamily: "Inter400",
                        fontSize: 15,
                      }}
                    >
                      Manage Members
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </Pressable>
              {/* <Pressable
                onPress={() => router.push("/screens/AddDependentScreen")}
              >
                <ListItem
                  bottomDivider
                  containerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 11,
                    paddingBottom: 12,
                    borderBottomLeftRadius: 10,
                    borderBottomRightRadius: 10,
                  }}
                >
                  <Feather name="plus-circle" size={20} color="black" />
                  <ListItem.Content>
                    <ListItem.Title style={styles.listTitles}>
                      Add Members
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </Pressable> */}
            </>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitles}>APP SETTINGS</Text>
            <>
              <ListItem
                bottomDivider
                containerStyle={{
                  borderTopEndRadius: 10,
                  borderTopStartRadius: 10,
                  paddingHorizontal: 16,
                  // paddingVertical: 8,
                  // paddingVertical: 20,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content
                  style={{
                    height: 21,
                    // marginTop: 3,
                    // marginBottom: 4,
                    padding: 0,
                    margin: 0,
                  }}
                >
                  <ListItem.Title style={styles.listTitles}>
                    Language
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubtitles}>
                    {"English "} <Feather name="chevron-right" size={18} />
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem
                bottomDivider
                containerStyle={{
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    Country/Region
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubtitles}>
                    {"United States "}{" "}
                    <Feather name="chevron-right" size={18} />
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
              <ListItem
                topDivider
                containerStyle={{
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    App Appearance
                  </ListItem.Title>
                  <ListItem.Subtitle style={styles.listSubtitles}>
                    {"Default "} <Feather name="chevron-right" size={18} />
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitles}>HELP</Text>
            <>
              <ListItem
                bottomDivider
                containerStyle={{
                  borderTopEndRadius: 10,
                  borderTopStartRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    Help Center
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem
                // bottomDivider
                containerStyle={{
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    Customer Support
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </>
          </View>
          <View style={{ marginTop: 20 }}>
            <Text style={styles.sectionTitles}>LEGAL</Text>
            <>
              <ListItem
                bottomDivider
                containerStyle={{
                  borderTopEndRadius: 10,
                  borderTopStartRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    Terms and Conditions
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem
                bottomDivider
                containerStyle={{
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    Privacy Policy
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <Pressable>
                <ListItem
                  onPress={() => router.navigate("/screens/CreditScreen")}
                  topDivider
                  bottomDivider
                  containerStyle={{
                    paddingHorizontal: 16,
                    paddingTop: 11,
                    paddingBottom: 12,
                  }}
                >
                  <ListItem.Content
                    style={{ height: 21, padding: 0, margin: 0 }}
                  >
                    <ListItem.Title style={styles.listTitles}>
                      Credit
                    </ListItem.Title>
                  </ListItem.Content>
                </ListItem>
              </Pressable>
              <ListItem
                // bottomDivider
                containerStyle={{
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    Disclaimer
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </>
          </View>
          <View style={{ marginVertical: 20 }}>
            <>
              <ListItem
                bottomDivider
                containerStyle={{
                  borderTopEndRadius: 10,
                  borderTopStartRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title style={styles.listTitles}>
                    App Version 0.0.0
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
              <ListItem
                containerStyle={{
                  borderBottomEndRadius: 10,
                  borderBottomStartRadius: 10,
                  paddingHorizontal: 16,
                  paddingTop: 11,
                  paddingBottom: 12,
                }}
              >
                <ListItem.Content style={{ height: 21, padding: 0, margin: 0 }}>
                  <ListItem.Title
                    style={{
                      color: "red",
                      fontSize: 15,
                      fontFamily: "Inter400",
                    }}
                  >
                    <Feather name="log-out" size={20} /> Logout
                  </ListItem.Title>
                </ListItem.Content>
              </ListItem>
            </>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  membersContainer: {
    // width: "90%",
    // position: "absolute",
    // top: "2%",
    marginHorizontal: 16,
    marginTop: 10,
  },
  background: {
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: "#EFF4F4",
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
    fontFamily: "Inter400",
    fontSize: 16,
  },
  listTitles: {
    fontFamily: "Inter400",
    fontSize: 16,
  },
  scrollView: {
    //     backgroundColor: "pink",
    marginHorizontal: 20,
    flex: 1,
  },
  sectionTitles: {
    fontSize: 14,
    marginBottom: 7,
    paddingHorizontal: 16,
    fontFamily: "Inter400",
  },
});

export default SettingsScreen;
