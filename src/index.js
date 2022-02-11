import React, { useState } from "react";
import { render } from "react-dom";
import * as data from "./messages.json";
import "./index.css";

// Functional component

// Main App component
// renders a list of Messages using data from messages.json
const App = (props) => {
  let [taggedUsersBoxVissible, setTaggedUsersBoxVissible] = useState(false);
  let [users, setUsers] = useState(["Ricardo", "Julia", "Frederik"]);
  let [taggedUsers, setTaggedUser] = useState("");
  let [inputValue, setInputValue] = useState("");
  let [userPressedAtKey, setUserPressedAtKey] = useState(false);
  let [indexPosition, setIndexpostion] = useState(0);

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function getSelectedPositionIndex(el) {
    var val = el.value;
    return val.slice(0, el.selectionStart).length;
  }

  function setTagedUserToInput(user) {
    var oldInputValue = inputValue;
    var userName = user;
    var position = indexPosition;
    console.log(oldInputValue.slice(0, position + 1), "username");

    var newInputValue = [
      oldInputValue.slice(0, position + 1),
      userName,
      oldInputValue.slice(position + 1)
    ].join("");
    console.log(position);

    setInputValue(newInputValue);
    setIndexpostion(0);
  }

  function handleKeyDown(event) {
    if (event.key === "@") {
      setUserPressedAtKey(true);
      let stringIndex = getSelectedPositionIndex(event.target);
      setIndexpostion(stringIndex);
      setTaggedUsersBoxVissible(true);
      return;
    }

    setTaggedUsersBoxVissible(false);
    setUserPressedAtKey(false);
  }

  function addUserToTaggedUsers(user) {
    setTaggedUser(user);
    if (userPressedAtKey) {
      setTagedUserToInput(user);
    }
  }

  return (
    <div>
      <h2>Tag users </h2>
      {taggedUsersBoxVissible && (
        <div className="users-box">
          <ul className="users-box__list">
            {users.map((user) => {
              return (
                <li
                  onClick={() => addUserToTaggedUsers(user)}
                  className="users-box__item"
                >
                  {user}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <input
        value={inputValue}
        onKeyDown={(e) => handleKeyDown(e)}
        onChange={(e) => handleInputChange(e)}
      />
    </div>
  );
};

render(<App messages={data.messages} />, document.getElementById("root"));
