import { NavLink } from "react-router-dom";

export default function NoteBox(props) {
  return (
    <div className="noteBox">
      <h3 className="noteTitle">
        <NavLink to={`/note/${props.id}`}>{props.name}</NavLink>
      </h3>
      <button className="deleteBtn">Del</button>
    </div>
  );
}
