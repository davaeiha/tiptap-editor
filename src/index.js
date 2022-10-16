import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient,
    InMemoryCache,
    ApolloProvider,
    ApolloLink,
    HttpLink,
    from,
    concat 
  } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import "./index.scss";
import App from "./App.tsx";
//@ts-ignore
import { EditorProvider } from "./contexts/EditorContext.tsx";

const errorLink = onError(({graphQLErrors,networkError})=>{
  if (graphQLErrors) {
    graphQLErrors.map(({message,locations,path})=>{
      console.log(`Graphql Error: ${message}`)
    })
  }

  if (networkError) {
    console.log(`Network Error: ${networkError}`);
  }
});


const httpLink = new HttpLink({
  uri:'http://localhost:3001/api/graphql',
})

const jsonMiddleware = new ApolloLink((operation, forward) => {

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      accept: "*/*",
      'content-type': 'application/json',
      authorization: localStorage.getItem('token') ? 
      'Bearer ' + localStorage.getItem('token') :
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiIxMTgyOGMwNi1kY2Q2LTRmOGUtODcxYi1kZDBlZmE4ZDY1NjEiLCJ0ZWFtSWQiOiI2YTY2YjMzZC02NmFhLTRjMDgtYmRmNy00N2NiY2FkYTkxM2QiLCJpYXQiOjE2NjU5MDc1NDYsImV4cCI6MTY2NjUxMjM0Nn0.PI1LcbJ311DoSKOk-OAhyW5MEpQpgUrTGYPZ9HPRXw4"
    }
  }));

  return forward(operation);
})

const link = from([
  jsonMiddleware,
  errorLink,
  httpLink,
])

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <EditorProvider>
        <App/>
      </EditorProvider>
    </ApolloProvider>
  </React.StrictMode>
);
