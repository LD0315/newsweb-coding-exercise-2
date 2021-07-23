import React, { useState, useEffect } from "react";
import { TodoItem } from "../TodoItem/TodoItem";
import "./TodoApp.css";

export default function TodoList(props:any) {
    const countRemaining = (items:any[]) => {
        var count = 0;

        for (let i = 0; i < items.length; i++) {
            if(!items[i].done) {
              count++;
            }
        }
        return count;
    };

    const [myItems, setMyItems] = useState(props.items);
    const [remainingCount, setRemainingCount] = useState(countRemaining(props.items));
    useEffect(() =>{
        setMyItems(props.items);
        setRemainingCount(countRemaining(props.items));
    }, [props.items]);

    return (
      <>
      <div className="row">
          <div className="col-12">
              <table className="table table-hover">
                <thead>
                    <th scope="col">Remaining to do: {remainingCount}</th>
                </thead>
                <tbody>
                {myItems.map((item:any, i:any) => (
                  <TodoItem {...item}
                      index={i}
                      onChange={props.onTodoChange}
                      onDelete={props.onTodoDelete}
                      onEdit={props.onTodoEdit}
                      />
                ))}
                </tbody>
            </table>
          </div>
      </div>
      </>
    );
}