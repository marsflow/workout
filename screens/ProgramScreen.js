import * as React from 'react';
import { StyleSheet, View } from 'react-native';

import { CalendarList } from 'react-native-calendars';

import Program from '../constants/Program';

const ProgramScreen = ({navigation}) => 
{

	console.log(Program)
	
	return (
		<View style={styles.container}>
			<CalendarList
				// Callback which gets executed when visible months change in scroll view. Default = undefined
				onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
				// Max amount of months allowed to scroll to the past. Default = 50
				pastScrollRange={50}
				// Max amount of months allowed to scroll to the future. Default = 50
				futureScrollRange={50}
				// Enable or disable scrolling of calendar list
				scrollEnabled={true}
				// Enable or disable vertical scroll indicator. Default = false
				showScrollIndicator={true}

				onDayPress={(day) => navigation.navigate('ExerciseOverview', {day: day}) }

				markedDates={Program}

			/>
		</View>
	)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	},
})

export default ProgramScreen;

