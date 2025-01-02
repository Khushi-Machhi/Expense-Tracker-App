import { TextInput, View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";

function Input({ label, style, textInputConfig }) {

    const inputStyle = [styles.inpt];

    if (textInputConfig && textInputConfig.multiline) {
        inputStyle.push(styles.multilineInpt);
    }

    return <View style={[styles.inputContainer, style]}>
        <Text style={styles.lbl}>{ label }</Text>
        <TextInput style={inputStyle} {...textInputConfig} />
    </View>
}

export default Input;

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    lbl:{
        fontSize: 12,
        color: GlobalStyles.colors.primary100,
        marginBottom: 4
    },
    inpt: {
        backgroundColor: GlobalStyles.colors.primary100,
        color: GlobalStyles.colors.primary700,
        padding: 6,
        borderRadius: 6,
        fontSize: 18
    },
    multilineInpt: {
        minHeight: 100,
        textAlignVertical: 'top'
    }
});