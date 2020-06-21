import moment from 'moment';

function generateProgram(startDate) {
	
	let program = {}

	const totalExercise = (14 * 4)

	const end = moment(startDate, 'YYYY-MM-DD').add(totalExercise, 'days');



	const exercises = [
		{
			exercise: 'pull',
			start: moment(startDate, 'YYYY-MM-DD'),
			dayRepeat: 4,
			selectedColor: 'red',
		},
		{
			exercise: 'core',
			start: moment(startDate, 'YYYY-MM-DD').add(1, 'days'),
			dayRepeat: 8,
			selectedColor: 'orange',
		},
		{
			exercise: 'push',
			start: moment(startDate, 'YYYY-MM-DD').add(2, 'days'),
			dayRepeat: 4,
			selectedColor: 'blue',
		},
		{
			exercise: 'leg',
			start: moment(startDate, 'YYYY-MM-DD').add(5, 'days'),
			dayRepeat: 8,
			selectedColor: 'green',
		}
	]



	for (let i = moment(startDate, 'YYYY-MM-DD'); i < end; i.add(1, 'days')) {
		

		exercises.forEach((exercise, index) => {

			if (exercise.start.format('YYYY-MM-DD') === i.format('YYYY-MM-DD')) {	

				program[i.format('YYYY-MM-DD')] = {
					selected: true,
					selectedColor: exercise.selectedColor,
					...exercise
				}
				exercise.latest = moment(i, 'YYYY-MM-DD')
				return;

			} else if (typeof exercise.latest !== 'undefined') {

				var latest = exercise.latest.format('YYYY-MM-DD');
				var next = moment(latest, 'YYYY-MM-DD').add(exercise.dayRepeat, 'days').format('YYYY-MM-DD');

				if (next === i.format('YYYY-MM-DD')) {

					program[i.format('YYYY-MM-DD')] = {
						selected: true,
						selectedColor: exercise.selectedColor,
						...exercise
					}
		
					exercise.latest = moment(i, 'YYYY-MM-DD')
					return;
				}

			}
		})
	}

	return program
}

let yourProgram = generateProgram('2020-04-13');

yourProgram = { ...yourProgram, ...generateProgram('2020-06-14')}

export default yourProgram;