import gql from 'graphql-tag';

export default gql`
	query grid_size {
		grid_size @client {
			width
			height
		}
	}
`;
