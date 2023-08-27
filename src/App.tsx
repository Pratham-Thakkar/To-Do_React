import { ChangeEvent, useState } from "react";
import "./App.css";

const App = (): JSX.Element => {
  const [task, setNewTask]: [string, Function] = useState("");
  const [list, setNewList]: [Array<string>, Function] = useState([]);
  const [editingStatus, setEditingStatus]: [boolean, Function] =
    useState(false);
  const [editedValue, setEditedValue]: [string, Function] = useState("");
  const [indexToBeEdit, setIndexToBeEdit]: [number, Function] = useState(-1);
  const [className, setClassName]: [string, Function] = useState("input");

  function handleChange(e: ChangeEvent<HTMLInputElement>): void {
    setNewTask(e.target.value);
  }

  function addTask(): void {
    if (task.length > 0) {
      setNewList([...list, task]);
    } else {
      alert("Please add some values");
    }
    setNewTask("");
  }

  function deleteTask(index: number): void {
    const newList = [...list];
    newList.splice(index, 1);
    setNewList(newList);
  }

  function handleEdit(index: number) {
    setEditingStatus(true);
    setIndexToBeEdit(index);
  }

  function handleEditChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedValue(e.target.value);
  }

  function addChange() {
    const newList = [...list];

    if (indexToBeEdit > -1) {
      if (editedValue.length > 0) {
        newList.splice(indexToBeEdit, 1, editedValue);
        setNewList(newList);
        setEditingStatus(false);
        setEditedValue("");
        setIndexToBeEdit(-1);
      }
    } else {
      alert("Please add something, to be edited");
    }
  }
  function handleCompletion(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.checked) setClassName("input-strike");
    else setClassName("input");
  }
  return (
    <>
      {editingStatus ? (
        <>
          <h1>Edit Tasks:</h1>
          <input type="text" onChange={handleEditChange} />
          <button onClick={addChange}>Confirm Edit</button>
        </>
      ) : (
        <>
          <h1>Add Tasks:</h1>
          <input type="text" onChange={handleChange} value={task} />
          <button onClick={addTask}>Add</button>
        </>
      )}
      <ul>
        {list.map((value: string, index: number) => {
          return (
            <div className="list-item">
              <li
                className={className}
                key={index}
                style={{ display: "block" }}
              >
                {value}
              </li>
              <button
                style={{ display: "inline" }}
                onClick={() => deleteTask(index)}
              >
                Delete
              </button>
              <button
                style={{ display: "inline" }}
                onClick={() => handleEdit(index)}
              >
                Edit
              </button>
              <input type="checkbox" onChange={handleCompletion} />
            </div>
          );
        })}
      </ul>
    </>
  );
};

export default App;
