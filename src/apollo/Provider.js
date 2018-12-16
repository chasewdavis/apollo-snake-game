import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import init from './initialize';

class Provider extends Component {
    state = {
        loading: true,
        client: null
    }

    async componentWillMount() {
        const client = await init();
        this.setState({ loading: false, client })
    }

    render() {
        if(this.state.loading) { 
            return 'loading'; 
        }
        return (
            <ApolloProvider client={this.state.client}>
                {this.props.children}
            </ApolloProvider> 
        );
    }
}

export default Provider;
