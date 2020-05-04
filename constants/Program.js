import moment from 'moment';

const startDate = '2020-04-13'


const start = moment(startDate, 'YYYY-MM-DD');
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
		start: moment('2020-04-14', 'YYYY-MM-DD'),
		dayRepeat: 8,
		selectedColor: 'orange',
	},
	{
		exercise: 'push',
		start: moment('2020-04-15', 'YYYY-MM-DD'),
		dayRepeat: 4,
		selectedColor: 'blue',
	},
	{
		exercise: 'leg',
		start: moment('2020-04-18', 'YYYY-MM-DD'),
		dayRepeat: 8,
		selectedColor: 'green',
	}
]

let program = {}

console.log('com', start < end, start, end)

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

export default program;