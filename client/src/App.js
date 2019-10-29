import React from 'react';
import './App.css';

import { gql } from "apollo-boost";
import { Query } from '@apollo/react-components';

// GraphQL Query
const EXCHANGE_RATES = gql`
    {
        books{
        title
        author
        } 
    }
`;

const ExchangeRates = (
) => (
    <Query
      query={EXCHANGE_RATES}
    >
      {({ loading, error, data }) => {
        if (loading) return <p>

          Loading...</p>;
        if (error) return <p>Error :(</p>;

        return data.books.map(({ title, author }

        ) => (
            <div key={title}>
              <p>
                {title}: {author}
              </p>
            </div>
          ));
      }}
    </Query>
  );


function SideApp() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className="SideApp">
      <p>SideApp</p>
      {ExchangeRates()}
    </div>
  );
}

export default SideApp;


