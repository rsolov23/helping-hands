import React from "react";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  operationName,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import "../src/index.css";

import Header from "./components/Header/Header";
// import Footer from "./components/Footer/Footer";
import Home from "./components/Home/home";
import LoginForm from "./components/LoginForm/LoginForm";
import SignupForm from "./components/SignupForm/SignupForm";
import SinglePost from "./components/SingleEvent/SingleEvent";
import Event from "./components/Event/Event";
import Volunteer from "./components/Volunteer/Volunteer";
import Aboutus from "./components/Aboutus/Aboutus";
import Donate from "./components/Donate/Donate";
import Footer from "./components/Footer/Footer";
const httpLink = createHttpLink({
  uri: "/graphql"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <ChakraProvider>
          <Header />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/signup" component={SignupForm} />
            <Route exact path="/login" component={LoginForm} />
            <Route exact path="/event" component={Event} />
            <Route exact path="/volunteer" component={Volunteer} />
            {/* <Route exact path="/aboutus" component={Aboutus} /> */}
            <Route exact path="/post/:id" component={SinglePost} />
            <Route exact path="/Donate" component={Donate} />
          </Switch>
        </ChakraProvider>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
