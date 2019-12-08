import React from 'react';
import './App.css';

import { gql } from 'apollo-boost';
import { Query } from '@apollo/react-components';

// GraphQL Query
const EXCHANGE_RATES = gql`
  {
    books {
      title
      author
    }
  }
`;

const ExchangeRates = () =>
  <Query query={EXCHANGE_RATES}>
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error :(</p>;

      return data.books.map(({ title, author }) =>
        <div key={title}>
          <p>
            {title}: {author}
          </p>
        </div>
      );
    }}
  </Query>;

function SideApp() {
  return (
    <div className="SideApp">
      <p>SideApp</p>
      {ExchangeRates()}
    </div>
  );
}

export default SideApp;
