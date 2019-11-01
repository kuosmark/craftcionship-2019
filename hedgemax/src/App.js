import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Calendar from "./components/Calendar/Calendar";
import { ApolloProvider } from "@apollo/react-hooks";
import gql from "graphql-tag";

import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

function App() {
  const defaultOptions = {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "ignore"
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all"
    }
  };

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(({ graphQLErrors, networkError, operation }) => {
        if (graphQLErrors && graphQLErrors.length > 0) {
          console.log("GraphQL errors: ");
          graphQLErrors.forEach(gqlError => {
            console.log(gqlError.message);
          });
        }
        if (networkError) {
          console.log(
            "Network error: ",
            networkError.statusCode,
            " ",
            networkError.name
          );
          if (networkError.response && networkError.response.redirected) {
            console.log("Redirecting...");
          }
        }
        if (operation) {
          console.log("Operation: ", operation);
        }
      }),
      new HttpLink({
        uri:
          "https://de4m4w45tnamdnpmvjyt4blscm.appsync-api.eu-west-1.amazonaws.com/graphql",
        apiKey: process.env.REACT_APP_API_URL
      })
    ]),
    cache: new InMemoryCache(),
    defaultOptions: defaultOptions
  });
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossorigin="anonymous"
      />
      <ApolloProvider client={client}>
        <Calendar />
      </ApolloProvider>
    </div>
  );
}

export default App;
