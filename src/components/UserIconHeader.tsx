import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Dependent,
  useDependentIds,
  useDependents,
} from "../app/utils/firebaseUtils";
import { useUserId } from "../app/utils/globalStorage";
import { UserIcon } from "./UserIcons";
import { useEffect, useState } from "react";

interface UserIconHeaderProps {
  onPress?: (dependentId: string) => void;
}

const UserIconHeader = ({
  onPress,
}: UserIconHeaderProps): React.ReactElement => {
  const { userId, setUserId } = useUserId();
  const [selectedIcon, setSelectedIcon] = useState("");

  const dependentsIdsArray = useDependentIds(userId!);
  const dependents = useDependents(dependentsIdsArray);

  return (
    // <View style={styles.iconContainer}>
    <View style={{ flexDirection: "row" }}>
      {Object.keys(dependents).map(function (dependentId) {
        const iconName = dependents[dependentId].icon;
        const name = dependents[dependentId].firstName;
        return (
          <Pressable
            onPress={() => {
              setSelectedIcon(iconName);
              onPress?.(dependentId);
              console.log(dependents[dependentId].symptoms);
            }}
          >
            <View style={styles.iconContainer}>
              <UserIcon
                name={
                  selectedIcon === iconName
                    ? iconName + "Selected"
                    : iconName + "Circle"
                }
                height={60}
                width={60}
              />
              <Text
                style={{
                  fontFamily: "Inter400",
                  marginTop: 8,
                  color: selectedIcon === iconName ? "black" : "#979B9B",
                  fontSize: 14,
                }}
              >
                {name}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    marginRight: 14,
    alignItems: "center",
  },
  //   names: {
  //     fontFamily: "Inter400",
  //     fontSize: 14,
  //     color:
  //     marginTop: 8,
  //   },
});
export default UserIconHeader;
