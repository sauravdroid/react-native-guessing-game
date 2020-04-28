import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native';
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
import Colors from '../constants/colors';

const StartGameSreen = props => {
    const [enteredValue, setEnteredValue] = useState();
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();

    const numberInputHandelr = useCallback(inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g, ''));
    }, []);

    const resetInputHandler = useCallback(() => {
        setEnteredValue('');
    }, []);

    const confirmInputHandler = useCallback(() => {
        const chosenNumber = parseInt(enteredValue);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert(
                'Invalid number !', 
                'Number has to be in between 1 and 99.', 
                [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
            )
            return;
        }
        // Will be batched to together in on render cycle
        setConfirmed(true);
        setEnteredValue('');
        setSelectedNumber(parseInt(enteredValue));
        Keyboard.dismiss()
    }); 

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected </Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton onPress={ () => props.onStartGame(selectedNumber) }>Start Game</MainButton>
            </Card>
        )
    }

    return (
        <TouchableWithoutFeedback 
                onPress={() => {
                    Keyboard.dismiss()
                }}
        >
            <View style={styles.screen}>
                <Text style={styles.title}>Start a new  game</Text>
                <Card style={styles.card}>
                    <Text>Select a number</Text>
                    <Input 
                        style={styles.input} 
                        keyboardType="numeric" 
                        maxLength={2}
                        blurOnSubmit
                        autoCapitalize='none'
                        autoCorrect={false}
                        onChangeText={numberInputHandelr}
                        value={enteredValue}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <Button 
                                title="Reset" 
                                onPress={resetInputHandler} 
                                color={Colors.accent}
                            />
                        </View>
                        <View style={styles.button}>
                            <Button 
                                title="Confirm" 
                                onPress={confirmInputHandler} 
                                color={Colors.primary} 
                            />
                        </View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        alignItems: 'center',
        flex: 1
    },
    card: {
        width: 300,
        maxWidth: '80%',
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'open-sans-bold'
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    button: {
        width: 80,
    },
    input: {
        width: 50,
        textAlign: 'center'
    },
    summaryContainer: {
       marginTop: 20,
       alignItems: 'center'
    }
});

export default StartGameSreen;