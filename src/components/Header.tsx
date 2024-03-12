import React from "react";
import { View, Text, StyleSheet } from "react-native";
import HeaderRight from "./HeaderRight";
import { UserIcon } from "./UserIcons";
import { useUserId } from "../app/utils/globalStorage";
import { useUser } from "../app/utils/firebaseUtils";

const Header = () => {
  const { userId, setUserId } = useUserId();

  return (
    <View style={styles.headerWrapper}>
      <View style={styles.welcomeWrapper}>
        <UserIcon name="bearCircle" />
        <Text style={styles.text}>Welcome Back, Maria!</Text>
      </View>
      <HeaderRight />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Inter600",
  },
  headerWrapper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 16,
  },
  welcomeWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconWrapper: {
    flexDirection: "row",
    gap: 16,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default Header;
