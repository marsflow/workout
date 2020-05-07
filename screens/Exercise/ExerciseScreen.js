import React, { useState, useEffect } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Alert, AsyncStorage } from 'react-native';
import { Audio } from 'expo-av';
import { useKeepAwake } from 'expo-keep-awake';


// let restDuration = null;

// const getData = async () => {
// 	try {
// 		restDuration = await AsyncStorage.getItem('restDuration');
// 		console.log('bedebah');
// 	} catch(error) {
// 		console.log(error)
// 	}
// }

// if (restDuration === null)
// 	getData();

const ExerciseScreen = ({route, navigation}) => {
    
	useKeepAwake();

	const { exercises } = route.params;

	const moves = [];

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

	const [move, setMove] = useState(moves);
	const [restDuration, setRestDuration] = useState()
	const [timer, setTimer] = useState();

	const [pointer, setPointer] = useState(0);


	const timerStart = () => setInterval(async () => {

		console.log(`restDuration: ${restDuration} - timer: ${timer}`)
		
		try {
				
			if (timer <= 1) {
				console.log('monster kill');
				var soundObject = new Audio.Sound();
				await soundObject.loadAsync(require('../../assets/sounds/monster-kill.mp3'));
				await soundObject.playAsync();
			}
			setTimer(timer - 1)

		} catch (error) {
				console.log(error)
		}

	}, 1000)
	
	



	useEffect(() => {
		

		async function getData () {
			try {
				setRestDuration(await AsyncStorage.getItem('restDuration'))
				console.log('bedebah');
			} catch(error) {
				console.log(error)
			}
		}

		if (!restDuration) {
			console.log(`rest duration on effect: ${restDuration}`)
			getData();
		}
			

		if (!timer) return;

		let interval = timerStart();

		return () => {
			clearInterval(interval)
		}

	}, [timer, restDuration])

	const previousMove = () => {

		setTimer(restDuration)
		let gembel = timerStart();
		if (pointer - 1 < 0) return
		setPointer(pointer - 1)

		return clearInterval(gembel)

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

	const nextMove = async () => {
		
		setTimer(restDuration)
		let gembel = timerStart();
		if (pointer + 1 >= moves.length) return
		setPointer(pointer + 1)


		return clearInterval(gembel)
	}


	if (!restDuration && !timer)  {
		return null;
	} else {
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