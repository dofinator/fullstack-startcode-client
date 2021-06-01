import React, { useState } from "react";
import ILyndaFriend, { Gender } from "../interfaces/interfaces"
import { useQuery, gql } from "@apollo/client"

type AddFriendProps = {
  initialFriend?: ILyndaFriend
}

interface IKeyableFriend extends ILyndaFriend {
  [key: string]: any
}

const ADD_FRIEND = gql`
mutation createFriend($friend: ILyndaFriend){
  createFriend(input: $friend) {
    id
    firstName
    lastName
    password
    email
    gender
  }
}
`

const AddFriend = ({ initialFriend }: AddFriendProps) => {
  const EMPTY_FRIEND: ILyndaFriend = { firstName: "", lastName: "", password: "", email: "", gender: "OTHER" }
  let newFriend = initialFriend ? initialFriend : { ...EMPTY_FRIEND }

  const [friend, setFriend] = useState({ ...newFriend })

  const handleChange = (event: any) => {
    const id = event.currentTarget.id;
    let friendToChange: IKeyableFriend = { ...friend }
    friendToChange[id] = event.currentTarget.value;
    setFriend({ ...friendToChange })
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(JSON.stringify(friend))
    //Todo save friend on servers
    setFriend({ ...EMPTY_FRIEND })
  }


  return (
    <form onSubmit={handleSubmit}>
      <label>
        FirstName<br />
        <input type="text" id="firstName" value={friend.firstName} onChange={handleChange} />
      </label>
      <br />
      <label>
        LastName <br />
        <input type="text" id="lastName" value={friend.lastName} onChange={handleChange} />
      </label>
      <br />
      <label>
        password <br />
        <input type="text" id="password" value={friend.password} onChange={handleChange} />
      </label>
      <br />
      <label>
        email <br />
        <input type="text" id="email" value={friend.email} onChange={handleChange} />
      </label>
      <br />
      <label>
        Gender &nbsp;
          <select id="gender" value={friend.gender} onChange={handleChange}>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
          <option value="OTHER">Other</option>
        </select>
      </label>
      <br />
      <br /><br />
      <input type="submit" value="Submit" />
    </form>
  );
}

export default AddFriend;
