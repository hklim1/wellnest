import { Stack, router } from "expo-router";
import { Button, Icon, ThemeProvider } from "@rneui/themed";
import { Text, TextInput, View } from "react-native";

type StackScreenProps = { title: string };

export default function StackScreenComponent(props: StackScreenProps) {
  const { title } = props;

  return (
    <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: () => (
          <Text style={{ fontSize: 16, fontWeight: "500" }}>{title}</Text>
        ),
        headerStyle: { backgroundColor: "#f2f2f2" },
        headerLeft: () => (
          <Button
            type="clear"
            onPress={() => router.push("/screens/HouseHold")}
            title={"  "}
            icon={<Icon name="chevron-left" color="black" size={30} />}
          />
        ),
        headerShadowVisible: false,
        headerBackTitleVisible: false,
      }}
    />
  );
}
