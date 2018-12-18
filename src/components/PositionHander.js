import React, { Component } from 'react';
import { compose, graphql, withApollo } from 'react-apollo';
import QueryTime from '../apollo/graphql/QueryTime';
import QueryVelocity from '../apollo/graphql/QueryVelocity';
import UpdatePosition from '../apollo/graphql/UpdatePosition';

class PositionHandler extends Component {
    state = {
        tick: null
    }

    componentDidUpdate(prevProps) {
        // if (this.state.tick !== prevProps.tick ) { 
        //     console.log('update position');
        //     console.log('\n')
        //     this.setState({ tick: prevProps.tick }) 
        // }
    }

    render() {
        // console.log('speed', speed);
        // console.log('direction', direction);

        return <div />
    }
}

export default compose(
    withApollo,
    graphql(QueryTime, {
        props: ({ data }) => data.time
    }),
    graphql(QueryVelocity, {
        props: ({ data }) => data.velocity
    }),
    graphql(UpdatePosition, {
        name: 'updatePosition'
    })
)(PositionHandler);
