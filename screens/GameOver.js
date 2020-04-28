import React from 'react';
import {View, StyleSheet, Text, Button, Image} from 'react-native';
import MainButton from '../components/MainButton';

const GameOver = props => {
    return (
        <View style={styles.screen}>
            <Text>Game is Over!</Text>
            <View style={styles.imageContainer}>
                {/* Width and height always required */}
                <Image 
                    source={require('../assets/images/success.png')}
                    resizeMode="cover"
                    style={styles.image}
                />
            </View>
            <MainButton onPress={props.onNewGame}>NEW GAME !</MainButton>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        borderRadius: 10,
        borderColor: 'blue',
        width: 300,
        height: 300,
        overflow: 'hidden',
        elevation: 5
    }
});

export default GameOver;