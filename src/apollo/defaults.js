const defaults = {
    position: {
        __typename: 'position',
        x: 2,
        y: 2
	},
	snake: {
		__typename: 'snake_positions',
		positions: []
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
