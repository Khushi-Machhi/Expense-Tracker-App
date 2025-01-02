import { StyleSheet, View, Text, Alert } from "react-native";
import Input from "../ManageExpense/Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from '../../util/date';

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValues }) {

    const [ inputValues, setInputValues ] = useState({
        amount: defaultValues ? defaultValues.amount.toString() : '',
        date: defaultValues ? getFormattedDate(defaultValues.date) : '',
        // date: defaultValues ? defaultValues.date.toISOString().slice(0, 10) : '',  
        description: defaultValues ? defaultValues.description : ''
    });

    function inputChangedHandler(inputIdentifier, enteredValue) {
        setInputValues((currentInputValues) => {
            return {
                ...currentInputValues,
                [inputIdentifier]: enteredValue
            };
        });
    }

    function submitHandler(){
        const expenseData = {
            amount: +inputValues.amount,
            date: new Date(inputValues.date),
            description: inputValues.description
        };

        const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid){
            Alert.alert('Invalid Input', 'Please check your input values.');
            return;
        }

        onSubmit(expenseData);
    }

    return(
    <View style={styles.formContainer}>
        <Text style={styles.titl}>Your Expense</Text>
        <View style={styles.rowInput}>
        <Input style={styles.r} label="Amount" textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangedHandler.bind(this, 'amount'),
            value: inputValues.amount,
        }} />
        <Input style={styles.r} label="Date" textInputConfig={{
            placeholder: 'YYYY-MM-DD',
            maxLength: 10,
            onChangeText: inputChangedHandler.bind(this, 'date'),
            value: inputValues.date,
        }}/>
        </View>
        <Input label="Description" textInputConfig={{
            multiline: true,
            // autoCorrect: false // default is true 
            onChangeText: inputChangedHandler.bind(this, 'description'),
            value: inputValues.description, 
        }}
        />


        <View style={styles.btnsContainer}>
            <Button style={styles.btn} mode="flat" onPress={onCancel} >
                Cancel
            </Button>
            <Button style={styles.btn} onPress={submitHandler} >
                {submitButtonLabel}
            </Button>
        </View>


    </View>
    );

}

export default ExpenseForm;

const styles = StyleSheet.create({
    formContainer: {
        marginTop: 40,
    },
    titl: {
        fontWeight: 'bold',
        fontSize: 24,
        color: 'white',
        marginVertical: 24,
        textAlign: 'center'
    },
    rowInput: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    r: {
        flex: 1
    },
    btnsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btn: {
        minWidth: 120,
        marginHorizontal: 8,
        color: 'white'
    },
});