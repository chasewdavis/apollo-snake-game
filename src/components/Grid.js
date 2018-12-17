import _ from 'lodash';
import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import QueryPosition from '../apollo/graphql/QueryPosition';
import QueryGridSize from '../apollo/graphql/QueryGridSize';

class Grid extends Component {
    render() {
        const { x, y, width, height } = this.props;
        const xs = _.range(width);
        const ys = _.range(height);
        return (
            <div className="grid-container">
                {_.map(ys, yblock => (
                    _.map(xs, xblock => (
                        <div 
                            key={`${xblock}${yblock}`} 
                            className={x === xblock && y === yblock ? 'on-block' : 'block'}
                        />
                    ))
                ))}
            </div>
        );  
    }
}

export default compose(
    withApollo,
    graphql(QueryPosition, {
        props: ({ data }) => data.position
	}),
	graphql(QueryGridSize, {
		props: ({ data }) => data.grid_size
	})
)(Grid);
