import * as React from 'react';
import { Text, Button, View, StyleSheet } from 'react-native';

import Program from '../../constants/Program';
import Exercises from '../../constants/Exercises';



const ExerciseOverviewScreen = ({route, navigation}) => {

	const { day } = route.params

	// const today = moment(new Date(), 'YYYY-MM-DD')
	const today = day.dateString

	let schedule = Object.keys(Program).filter((key) => key === today)
	schedule = Program[schedule]

	let exerciseType = Object.keys(Exercises).filter((key) => key === schedule.exercise)
	const exercises = Exercises[exerciseType]

	console.log(exercises)
	
	return (
		<View style={styles.container}>
			<Text style={{ color: schedule.selectedColor, ...styles.header}}>
				{`${exerciseType}`.toUpperCase()} EXERCISE
			</Text>
			{exercises.map((exercise, index) => (
				<View key={index} style={styles.exercises}>
					<Text style={styles.exercise}>
						{exercise.name} (
							{exercise.sets} sets x 
							{(typeof exercise.reps !== 'undefined') ? ` ${exercise.reps} reps` : ``}
							{(typeof exercise.duration !== 'undefined') ? ` ${exercise.duration} seconds` : ``}
						)
					</Text>
					<Text>--- Rest ---</Text>
				</View>
			))}
			<View style={{marginTop: 60}}>
				<Button
					onPress={() => navigation.navigate('Exercise', {exercises: exercises})}
					buttonStyle={{fontSize: 48}}
					title="Go"
					color={schedule.selectedColor}
				/>
			</View>
				
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',

	},
	header: {
		fontSize: 36,
		paddingBottom: 12,
	},
	exercises: {
		alignItems: 'center',
	},
	exercise: {
		fontSize: 16,
		paddingBottom: 8,
	},
})

ExerciseOverviewScreen.navigationOptions = {
  header: null,
};

export default ExerciseOverviewScreen;