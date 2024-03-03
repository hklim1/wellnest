import { View, Image, Pressable, StyleSheet } from "react-native";
import { UserIcon as UserIcons } from "../lib/userIcons";

type Props = {
    icon: UserIcons;
    activeId: number;
    setActiveId: React.Dispatch<React.SetStateAction<number>>;
};

const UserIcon = ({ icon, activeId, setActiveId }: Props) => {
    return (
        <Pressable onPress={() => setActiveId(icon.id)}>
            <View
                style={[
                    styles.container,
                    activeId == icon.id ? styles.active : null,
                ]}>
                <Image
                    source={icon.img}
                    style={styles.img}
                    resizeMode='contain'
                />
            </View>
        </Pressable>
    );
};

export default UserIcon;

const styles = StyleSheet.create({
    container: {
        padding: 3,
        borderRadius: 100,
        width: 50,
        height: 50,
        backgroundColor: "#B7E4E7",
        justifyContent: "center",
        alignItems: "center",
    },
    img: {
        width: 40,
        height: 40,
    },
    active: {
        backgroundColor: "#FFE4E7",
    },
});
