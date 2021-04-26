import React from "react";
import "../App.css"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client"
import AddFriend from "./AddFriend";
import AllFriends from "./AllFriends"
import FindFriend from "./FindFriend"
import Home from "./Home"

const URI = "http://localhost:5555/graphql"

const client = new ApolloClient({
  uri: URI,
  cache: new InMemoryCache()
})

export default function App() {
  return (
    <Router>
      <div>
        <ul className="header">
          <li>
            <NavLink exact activeClassName="selected" to="/">Home</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/allFriends">All Friends</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/findFriend">Find Friend</NavLink>
          </li>
          <li>
            <NavLink exact activeClassName="selected" to="/addFriend">Add Friend</NavLink>
          </li>
        </ul>

        <hr />

        <div className="content">
          <ApolloProvider client={client}>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/allFriends">
                <AllFriends />
              </Route>
              <Route path="/findFriend">
                <FindFriend />
              </Route>
              <Route path="/addFriend">
                <AddFriend />
              </Route>

            </Switch>
          </ApolloProvider>
        </div>

      </div>
    </Router>
  );
}
