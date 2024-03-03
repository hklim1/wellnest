import { Stack } from "expo-router";
import { ThemeProvider } from "@rneui/themed";
import { AppTheme } from "./themes";
import {
    useFonts,
    Inter_100Thin,
    Inter_200ExtraLight,
    Inter_300Light,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_800ExtraBold,
    Inter_900Black,
} from "@expo-google-fonts/inter";
import { RootSiblingParent } from "react-native-root-siblings";

const Layout = () => {
    let [fontLoaded, fontError] = useFonts({
        Inter100: Inter_100Thin,
        Inter200: Inter_200ExtraLight,
        Inter300: Inter_300Light,
        Inter400: Inter_400Regular,
        Inter500: Inter_500Medium,
        Inter600: Inter_600SemiBold,
        Inter700: Inter_700Bold,
        Inter800: Inter_800ExtraBold,
        Inter900: Inter_900Black,
    });

    if (!fontLoaded && !fontError) {
        return null;
    }
    return (
        <ThemeProvider theme={AppTheme}>
            <RootSiblingParent>
                <Stack
                    screenOptions={{
                        headerShown: false,
                    }}
                />
            </RootSiblingParent>
        </ThemeProvider>
    );
};

export default Layout;
