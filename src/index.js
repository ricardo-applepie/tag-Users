import React, { useState } from "react";
import { render } from "react-dom";
import "./index.css";

// Main App component

const App = (props) => {
  let [taggedUsersBoxVissible, setTaggedUsersBoxVissible] = useState(false);
  let [users, setUsers] = useState(["Ricardo", "Julia", "Frederik"]);
  let [taggedUser, setTaggedUser] = useState("");
  let [inputValue, setInputValue] = useState("");
  let [userPressedAtKey, setUserPressedAtKey] = useState(false);
  let [indexPosition, setIndexposition] = useState(0);

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
    var newInputValue = [
      oldInputValue.slice(0, position + 1),
      userName,
      oldInputValue.slice(position + 1)
    ].join("");

    setInputValue(newInputValue);
    setIndexposition(0);
  }

  function handleKeyDown(event) {
    if (event.key === "@") {
      setUserPressedAtKey(true);
      let stringIndex = getSelectedPositionIndex(event.target);
      setIndexposition(stringIndex);
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
