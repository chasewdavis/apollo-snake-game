import ApolloClient from 'apollo-client';
import { persistCache } from 'apollo-cache-persist';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state/lib/index';
import resolvers from './resolvers';
import defaults from './defaults';
import typeDefs from './typeDefs';

const cache = new InMemoryCache();

const stateLink = withClientState({ 
    cache,
    defaults,
    resolvers,
    typeDefs
});

const init = async () => {
    await persistCache({
        cache,
        storage: window.localStorage,
        debug: true
    });

    const client = new ApolloClient({
        link: stateLink,
        cache,
        connectToDevTools: true
    });

    return client;
};

export default init;
