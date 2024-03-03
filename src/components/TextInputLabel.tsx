import React from "react";
import {
    View,
    Text,
    TextInput,
    TextInputProps,
    StyleSheet,
} from "react-native";

type Props = {
    label: string;
} & TextInputProps;

const TextInputLabel = ({ label, ...inputProps }: Props) => {
    return (
        <View style={styles.wrapper}>
            <Text style={styles.label}>{label}</Text>
            <TextInput
                {...inputProps}
                cursorColor={"black"}
                style={styles.input}
                placeholderTextColor='grey'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        gap: 8,
    },
    input: {
        fontSize: 16,
        backgroundColor: "white",
        borderRadius: 10,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    label: {
        fontSize: 14,
        fontFamily: "Inter400",
        paddingLeft: 16,
    },
});

export default TextInputLabel;
