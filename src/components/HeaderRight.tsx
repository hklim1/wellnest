import { View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Badge } from "@rneui/themed";
import { Link } from "expo-router";

const HeaderRight = () => {
  return (
    <View style={styles.iconWrapper}>
      <Link href="/screens/notifications" asChild>
        <View>
          <Feather name="bell" size={24} />
          <Badge status="error" containerStyle={styles.badge} />
        </View>
      </Link>
      <Link href="/screens/SettingsScreen">
        <Feather name="settings" size={24} />
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  iconWrapper: {
    flexDirection: "row",
    gap: 32,
  },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
  },
});

export default HeaderRight;
