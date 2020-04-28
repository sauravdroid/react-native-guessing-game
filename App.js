import React, {useState, useCallback} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from './components/Header';
import GameScreen from './screens/GameScreen';
import StartGameSreen from './screens/StartGameScreen';
import GameOverScreen from './screens/GameOver';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};


export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  const configureNewGameHandler = useCallback(() => {
    setGuessRounds(0);
    setUserNumber(null);
  }, []);

  const startGameHandler = useCallback(selectedNumber => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  });

  const gameOverHandler = useCallback(numOfRounds => {
    setGuessRounds(numOfRounds);
  }, []);

  let content = <StartGameSreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
  } else if(guessRounds > 0) {
    content = <GameOverScreen onNewGame={configureNewGameHandler}/>
  }

  return dataLoaded 
    ? <View style={styles.screen}>
        <Header title="Guess a number"/>
        {content}
      </View>
    : <AppLoading
        startAsync={fetchFonts}
        onFinish={() => {
          console.log('App Loaded');
          setDataLoaded(true);
        }}
        onError={(err) => console.log(err)}
      />
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});
