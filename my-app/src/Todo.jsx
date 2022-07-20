import React from "react";
import axios from "axios";
function Todo(props) {
  console.log(props.list);
  return (
    <>
      <div>
        <ol>
          {props.list.map((item) => (
            <>
              <li>{item.todoItem}</li>
              <button onClick={() => props.handleDelete(item.id)}>
                Delete
              </button>
            </>
          ))}
        </ol>
      </div>
    </>
  );
}

export default Todo;
