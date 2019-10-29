import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';

// 通常設定
// // Apollo/GraphQL用ライブラリ
// import ApolloClient from 'apollo-boost';
import { gql } from "apollo-boost";

// Apollo、React連携用
import { ApolloProvider } from '@apollo/react-hooks';

// useQueryフック用
import { Query } from '@apollo/react-components';
import { useQuery, useSubscription } from '@apollo/react-hooks';

// 通常設定
// // Apolloの接続先設定
// const client = new ApolloClient({
//     uri: 'http://localhost:4000/graphql',
// });

// subscription用
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';

import { split } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';



// Create an http link:
const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql'
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
        reconnect: true
        // ,
        // connectionParams: {
        //     authToken: user.authToken,
        // },
    }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    link,
    cache: new InMemoryCache()
});


// GraphQL Query
const EXCHANGE_RATES = gql`
    {
        books{
        title
        author
        } 
    }
`;

var keyCnt = 0
function HookExchangeRates() {
    const { loading, error, data } = useQuery(EXCHANGE_RATES);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return data.books.map(({ title, author }) => (
        <div key={keyCnt++}>
            < p key={keyCnt++}>
                {title}: {author}
            </p>
        </div >
    ));
}

const COMMENTS_SUBSCRIPTION = gql`
    subscription{
        bookAdded{
            title
        }
    }
`;



var addData = new Array()
let newKey = 10000
function DontReadBooks() {
    // const { data: { books }, loading } = useSubscription(
    const books = useSubscription(
        COMMENTS_SUBSCRIPTION
    );

    if (!books.loading) {
        addData.push(<h4 key={newKey++} >New comment: {books.data.bookAdded.title}</h4>)
    }

    return addData

}

const App = () => (
    <ApolloProvider client={client}>
        <div>
            <DontReadBooks />
            <h2>My first Apollo app 🚀</h2>
            <HookExchangeRates />
        </div>
    </ApolloProvider>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


