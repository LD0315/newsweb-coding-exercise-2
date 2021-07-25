import React, { useState } from "react";
import "./TodoApp.css";
import "./bootstrap.min.css";
import TodoList from "./TodoList";

type TodoItemType = {
  todo: string;
  done: boolean;
  index: number;
};

const TodoApp = () => {
  const [items, setItems] = useState<any[]>([]);
  const [entry, setEntry] = useState("");
  const [warning, setWarning] = useState(false);


  const onSubmit = (e: any) => {

      if (entry === "") {
          setWarning(true);
          e.preventDefault();
          return false;
      }
      if (warning) {
          setWarning(false);
      }
    const newItem: TodoItemType = {
      todo: entry,
      done: false,
      index: items.length,
    };

    setItems([...items, newItem]);
    setEntry("");

    e.preventDefault();
    return false;
  };

  const onTodoChange = (index: number, value: boolean) => {
    setItems(
      items.map((item, i) => (i === index ? { ...item, done: value } : item))
    );
  };

  const onEdit = (index:number, value:string) => {
      setItems(
        items.map((item, i) => (i === index ? { ...item, todo: value } : item))
      );
  };

  const onTodoDelete = (index:number) => {
      let newItems = [];
        for (let i = 0; i < items.length; i++) {
            if (i == index) {
              continue;
            }
              newItems.push(items[i]);
        }
        setItems(newItems);
  };

  const warningRender = () => {
      return (
          <>
            <div className="alert alert-dismissible alert-light">
              <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  onClick={() => setWarning(false)}></button>
                  Can not add empty todo !
            </div>
          </>
        );
      }

  return (
    <>
     <div className="Todo bg-dark pt-5">
        <h1>My Todo List</h1>
        {warning === true && warningRender()}
        <div className="form-group row" >
          <div className="col-lg-12">
            <form onSubmit={onSubmit}>
                <input
                  className="col-lg-8"
                  type="text"
                  value={entry}
                  onChange={(e) => setEntry(e.target.value)}
                  placeholder="I need to..."
                />
                <button
                  type="submit" className="btn btn-success col-lg-4">Add Item
                </button>
              </form>
          </div>
          <TodoList
              items={items}
              onTodoChange={onTodoChange}
              onTodoDelete={onTodoDelete}
              onTodoEdit={onEdit}/>
            </div>
      </div>
  </>
  );
};

export { TodoApp };
