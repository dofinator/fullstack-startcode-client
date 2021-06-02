/* eslint-disable @typescript-eslint/no-unused-vars */

import React, { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client"
import ILyndaFriend from "../interfaces/interfaces"

const GET_FRIEND_BY_EMAIL = gql`
 query getFriend($input: String) {
    getFriendByEmail(input:$input){
     id
     email
     firstName
     lastName
   }
}
`

export default function FindFriend() {
  const [input, setInput] = useState("")
  const [getFriend, { loading, called, error, data }] = useLazyQuery(
    GET_FRIEND_BY_EMAIL,
    { fetchPolicy: "cache-and-network" }
  );

  const fetchFriend = () => {
    getFriend({ variables: { input } })
  }

  return (
    <div>
      Email:<input type="txt" value={input} onChange={e => {
        setInput(e.target.value)
      }} />
      &nbsp; <button onClick={fetchFriend}>Find Friend</button>
      <br />
      <br />
      {called && loading && <p>loading....</p>}
      {data && <p>{data.getFriendByEmail.firstName}</p>}
      <h2>Fetch a friend using the provided Email</h2>

    </div>)
}
