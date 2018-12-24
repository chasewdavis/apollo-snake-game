const defaults = {
    position: {
        __typename: 'position',
        x: null,
        y: null
	},
	snake: {
		__typename: 'snake_positions',
		snake_positions: []
	},
	next_tail: {
		__typename: 'next_tail',
		addToTail: false,
		x: null,
		y: null
	},
	time: {
		__typename: 'time',
		tick: 0
	},
    direction: {
        __typename: 'direction',
        direction: null
	},
	food: {
		__typename: 'food',
		x: null,
		y: null
	},
    grid_size: {
        __typename: 'grid_size',
        width: 10,
        height: 10
    }
}

export default defaults;
