import * as React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';


const ExerciseScreen = ({route, navigation}) => {
    
    useKeepAwake();

    const { exercises } = route.params;

    const moves = [];
    const pauseDuration = 120;

    let count = 0;
    for (var i = 0; i < exercises.length; i++) {
        for (var j = 0; j < exercises[i].sets; j++) {
            count++
            moves.push({
                no: count,
                name: `${exercises[i].name}: Set ${j+1} - (${exercises[i].reps}) Reps.`
            })
        }

        count++
        moves.push({
            no: count,
            name: 'Rest',
        })
    }

    const [move, setMove] = React.useState(moves);
    const [timer, setTimer] = React.useState(pauseDuration);

    const [pointer, setPointer] = React.useState(0);


    const timerStart = () => setInterval(async () => {
        if (timer <= 1) {
            var soundObject = new Audio.Sound();
            await soundObject.loadAsync(require('../../assets/sounds/monster-kill.mp3'));
            await soundObject.playAsync();
        }
        setTimer(timer - 1)

    }, 1000)
    

    React.useEffect(() => {

        if (!timer) return;


        let interval = timerStart();
        

        return () => {
            clearInterval(interval)
        }

    }, [timer])

    const previousMove = () => {
        if (pointer - 1 < 0) return
        setPointer(pointer-1)
    }

    const quit = () => [
        Alert.alert(
            'You\'re about to quit...!!!',
            'Are you sure you want to quit?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'I\'m so tired and a loser',
                    onPress: () => {
                        navigation.navigate('Program')
                    }
                }
            ]
        )
    ]

    const nextMove = () => {
        setTimer(pauseDuration)
        let gembel = timerStart();
        if (pointer + 1 > moves.length) return
        setPointer(pointer + 1)

        return clearInterval(gembel)
    }

    return (
        <View style={styles.container}>
                
            <Text>{(timer > 0) ? `Get ready for :` : `Go....`}</Text>


            <Text>{move[pointer].name}</Text>

            <Text><Text>{(timer > 0) ? timer : ``}</Text></Text>

            <View style={{flexDirection: 'row'}}>
                <TouchableOpacity 
                    disabled={pointer === 0}
                    onPress={() => previousMove()} 
                    style={styles.button}>
                    <Text>{`<<`}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={() => quit()}
                    style={styles.button}>
                    <Text>{`||`}</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    disabled={pointer >= moves.length}
                    onPress={() => nextMove()} 
                    style={styles.button}>
                    <Text>{`>>`}</Text>
                </TouchableOpacity>
            </View>

            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        padding: 10,
        margin: 10,
        height: 40
    }
})

export default ExerciseScreen;