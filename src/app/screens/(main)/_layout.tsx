import { Tabs, Stack } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Feather } from "@expo/vector-icons";

const TabLayout = () => {
    return (
        <Tabs
            initialRouteName='screens/HomeScreen'
            screenOptions={{
                tabBarInactiveTintColor: "white",
                tabBarActiveTintColor: "white",
                tabBarStyle: {
                    padding: 5,
                    height: 67,
                },
            }}>
            <Tabs.Screen
                name='Nest'
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            iconName='home'
                            focused={focused}
                            title='Nest'
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='History'
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            iconName='clock'
                            focused={focused}
                            title='History'
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='Track'
                options={{
                    title: "",
                    href: null,
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            iconName='play'
                            focused={focused}
                            title='asp'
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='Calendar'
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            iconName='calendar'
                            title='Calendar'
                            focused={focused}
                        />
                    ),
                }}
            />

            <Tabs.Screen
                name='HomeScreen'
                options={{
                    title: "",
                    tabBarIcon: ({ focused }) => (
                        <TabBarIcon
                            iconName='smile'
                            title='Me'
                            focused={focused}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

type TabProps = { focused: boolean; iconName: FeatherIcon; title: string };
const TabBarIcon = ({ focused, iconName, title }: TabProps) => {
    const color = focused ? "black" : "#979B9B";
    return (
        <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Feather name={iconName} size={24} color={color} />
            <Text style={[styles.titleText, { color: color }]}>{title}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    titleText: {
        fontSize: 12,
        textAlign: "center",
        fontFamily: "Inter500",
    },
});
export default TabLayout;
