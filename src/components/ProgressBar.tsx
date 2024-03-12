import { Feather } from "@expo/vector-icons";
import { Icon } from "@rneui/themed";
import { StyleSheet, View } from "react-native";

interface ProgressBarProps {
  activeButton: number;
}

const ProgressBar = ({ activeButton }: ProgressBarProps) => {
  return (
    <View style={styles.progressContainer}>
      <Icon
        name="circle"
        color={activeButton === 1 ? "#0FA6B0" : "#979B9B"}
        size={10}
        style={{ marginRight: 10 }}
      />
      <Icon
        name="circle"
        color={activeButton === 2 ? "#0FA6B0" : "#979B9B"}
        size={10}
        style={{ marginRight: 10 }}
      />
      <Icon
        name="circle"
        color={activeButton === 3 ? "#0FA6B0" : "#979B9B"}
        size={10}
        style={{ marginRight: 10 }}
      />
      <Icon
        name="circle"
        color={activeButton === 4 ? "#0FA6B0" : "#979B9B"}
        size={10}
        style={{ marginRight: 10 }}
      />
      <Icon
        name="circle"
        color={activeButton === 5 ? "#0FA6B0" : "#979B9B"}
        size={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressContainer: {
    // display: "flex",
    flexDirection: "row",
  },
});

export default ProgressBar;
