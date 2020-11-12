import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider, InMemoryCache } from '@apollo/client';
import './index.css';
import App from './App';
import Notifications from 'react-notify-toast';
import { BrowserRouter as Router } from 'react-router-dom';



const httpLink = createHttpLink({ uri: process.env.REACT_APP_API });
const client = new ApolloClient({
  // link,
  link: httpLink,
  cache: new InMemoryCache()
});



ReactDOM.render(
  <ApolloProvider client={client}>
    {/* <React.StrictMode> */}
      <Router>
        <Notifications />
        <App />
      </Router>
    {/* </React.StrictMode> */}
  </ApolloProvider>,
  document.getElementById('root')
);

