import React, { Component } from 'react';
import QueryPostion from './apollo/graphql/QueryPosition';
import UpdatePosition from './apollo/graphql/UpdatePosition';
import { compose, graphql, withApollo } from 'react-apollo';
import Grid from './components/Grid';
import ArrowKeys from './components/ArrowKeys';

class App extends Component {
    handleUpdatePosition = (props) => {
        const { updatePosition, position } = props;
        const { x, y } = position;
        updatePosition({
            variables: { x: x + 1, y: y + 1 }
        })
    }

    render() {
        return (
            <div className="App">
                <Grid />
                <ArrowKeys />
            </div>
        );
    }
}

export default compose(
    withApollo,
    graphql(QueryPostion, {
        props: ({ data: { position } }) => ({ position })
    }),
    graphql(UpdatePosition, {
        name: 'updatePosition'
    })
)(App);
