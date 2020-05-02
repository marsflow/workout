import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { CalendarList } from 'react-native-calendars';

const ProgramScreen = ({navigation}) => 
{

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

				onDayPress={(day) => navigation.navigate('Exercise', {day: day}) }

				markedDates={{
					// 5
					'2020-04-13': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-04-14': {
						selected: true,
						selectedColor: 'orange',
					},
					'2020-04-15': {
						selected: true,
						selectedColor: 'blue',
					},

					// 4
					'2020-04-17': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-04-18': {
						selected: true,
						selectedColor: 'green',
					},
					'2020-04-19': {
						selected: true,
						selectedColor: 'blue',
					},


					// 3
					'2020-04-21': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-04-22': {
						selected: true,
						selectedColor: 'orange',
					},
					'2020-04-23': {
						selected: true,
						selectedColor: 'blue',
					},

					// 2
					'2020-04-25': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-04-26': {
						selected: true,
						selectedColor: 'green',
					},
					'2020-04-27': {
						selected: true,
						selectedColor: 'blue',
					},

					// 1
					'2020-04-29': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-04-30': {
						selected: true,
						selectedColor: 'orange',
					},
					'2020-05-01': {
						selected: true,
						selectedColor: 'blue',
					},


					'2020-05-03': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-05-04': {
						selected: true,
						selectedColor: 'green',
					},
					'2020-05-05': {
						selected: true,
						selectedColor: 'blue',
					},

					'2020-05-07': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-05-08': {
						selected: true,
						selectedColor: 'orange',
					},
					'2020-05-09': {
						selected: true,
						selectedColor: 'blue',
					},

					// 1
					'2020-05-18': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-05-19': {
						selected: true,
						selectedColor: 'green',
					},
					'2020-05-20': {
						selected: true,
						selectedColor: 'blue',
					},

					// 2
					'2020-05-22': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-05-23': {
						selected: true,
						selectedColor: 'orange',
					},
					'2020-05-24': {
						selected: true,
						selectedColor: 'blue',
					},

					/// 3
					'2020-05-26': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-05-27': {
						selected: true,
						selectedColor: 'green',
					},
					'2020-05-28': {
						selected: true,
						selectedColor: 'blue',
					},

					// 4
					'2020-05-30': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-05-31': {
						selected: true,
						selectedColor: 'orange',
					},
					'2020-06-01': {
						selected: true,
						selectedColor: 'blue',
					},

					// 5
					'2020-06-03': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-06-04': {
						selected: true,
						selectedColor: 'green',
					},
					'2020-06-05': {
						selected: true,
						selectedColor: 'blue',
					},

					// 6
					'2020-06-07': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-06-08': {
						selected: true,
						selectedColor: 'orange',
					},
					'2020-06-09': {
						selected: true,
						selectedColor: 'blue',
					},

					// 7
					'2020-06-11': {
						selected: true,
						selectedColor: 'red',
					},
					'2020-06-12': {
						selected: true,
						selectedColor: 'green',
					},
					'2020-06-13': {
						selected: true,
						selectedColor: 'blue',
					},

				}}

			/>
		</View>
	)
}

export default ProgramScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
	},
})