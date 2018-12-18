const defaults = {
    position: {
        __typename: 'position',
        x: 5,
        y: 5
	},
	snake: {
		__typename: 'snake_positions',
		positions: []
	},
	time: {
		__typename: 'time',
		interval: null,
		tick: 0
	},
    velocity: {
        __typename: 'velocity',
        speed: 0,
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
