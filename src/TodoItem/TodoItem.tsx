import React, { useState } from "react";
import "./TodoItem.css";

type TodoItemProps = {
  todo: string;
  done: boolean;
  index: number;
  onChange: Function;
  onDelete: Function;
  onEdit: Function;
};
/**
 *
 * @param props   <li className={props.done ? "done" : "todo"}>
      <input type="checkbox" checked={props.done} onChange={onChange} />{" "}
      {props.todo}
    </li>
 */
const TodoItem = (props: TodoItemProps) => {

  const [inEdit, setInEdit] = useState(false);

  const editClicked = (e:any) => {
      e.preventDefault();
      if (inEdit) {

          return false;
      }
      setInEdit(true);

  };

  const doneClicked = (e:any) => {
      e.preventDefault();
      if (!inEdit) {
        return false;
      }
      setInEdit(false);
  };

  const onChange = (e: any) => {
    props.onChange(props.index, e.target.checked);
  };

  const onDelete = (e: any) => {
      props.onDelete(props.index);
      e.preventDefault();
  };

  const renderEditButton = () => {
      return (
        <button type="button"
              className="btn btn-secondary"
              onClick={editClicked}>Edit</button>
      );
  };

  const renderDoneButton = () => {
    return (
      <button type="button"
            className="btn btn-success"
            onClick={doneClicked}>Done</button>
    );
  };

//{props.index + 1} {"- "+ props.todo}
  const renderTodo = () => {
        const index = props.index + 1;
        const text = "" + index + ".    " + props.todo;
        return (
          <input
            id="disabledInput"
            type="text"
            placeholder={text}
            disabled={true}
          ></input>
        );
  };

  const renderEditable = () => {
        return (
              <input
                className="col-sm-6"
                type="text"
                value={props.todo}
                onChange={(e) => props.onEdit(props.index, e.target.value)}
              />
        );
  };
  return (
        <tr
          className={props.done ? "table-success" : "table-light"}
        >
        <td>
        <input
          type="checkbox"
          checked={props.done}
          onChange={onChange} />{" "}
          {!inEdit && renderTodo()}
          {inEdit && renderEditable()}
          {"    "}
          {!inEdit &&  renderEditButton()}
          {inEdit &&  renderDoneButton()}
          {" "}
        <button
           type="button"
           className="btn btn-info"
           onClick={onDelete}>Delete</button>
        </td>
      </tr>
  );
};

export { TodoItem };
export type { TodoItemProps };
