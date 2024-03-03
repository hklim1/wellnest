import { ListItem } from "@rneui/themed";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";

type Props = {
  iconName: FeatherIcon;
  name: string;
};

export const ListItemComponent = ({ iconName, name }: Props) => {
  return (
    <>
      <ListItem
        containerStyle={{
          borderRadius: 10,
          paddingHorizontal: 15,
          paddingVertical: 11,
          marginBottom: 10,
        }}
      >
        <ListItem.Content style={{ height: 25, padding: 0, margin: 0 }}>
          <ListItem.Title style={styles.listTitles}>
            <Feather name={iconName} size={18} color="black" />
            {"   "}
            {name}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.listSubtitles}>
            {"0  "}
            <Feather name="chevron-right" size={18} color="grey" />
          </ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    </>
  );
};

const styles = StyleSheet.create({
  listSubtitles: {
    position: "absolute",
    right: 0,
    padding: 0,
    margin: 0,
    color: "grey",
    fontFamily: "Inter400",
    fontSize: 15,
  },
  listTitles: {
    fontFamily: "Inter600",
    fontSize: 15,
  },
});
