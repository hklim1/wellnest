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

const CreditScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <ScrollView style={styles.background}>
        <Stack.Screen
          options={{
            headerBackTitle: "Cancel",
            headerShown: true,
            title: "Credit",
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
        <View style={styles.container}>
          <Text style={styles.sectionTitles}>ICONS</Text>
          <View style={styles.textContainer}>
            <Text style={styles.linkText}>
              All icons created by Freepik at{" "}
              <Link
                href="https://www.flaticon.com/authors/freepik"
                style={{ textDecorationLine: "underline" }}
              >
                Flaticon
              </Link>
              .
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#EFF4F4",
  },
  container: {
    marginHorizontal: 16,
    marginTop: 10,
    width: "92%",
  },
  header: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
    height: 30,
    position: "absolute",
    top: 50,
  },
  linkText: {},
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
  textContainer: {
    backgroundColor: "white",
    width: "100%",
    height: 42,
    borderRadius: 10,
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    paddingLeft: 16,
  },
});

export default CreditScreen;
