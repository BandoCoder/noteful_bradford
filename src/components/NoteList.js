import React from "react";
import NoteBox from "./NoteBox";
import { NavLink } from "react-router-dom";

export default function NoteListMain(props) {
  return (
    <section className="noteList">
      <ul>
        {props.notes.map((note) => (
          <li key={note.id}>
            <NoteBox id={note.id} name={note.name} />
          </li>
        ))}
      </ul>
      <NavLink className="AddNoteBox" to="/AddNoteForm">
        Add Note
      </NavLink>
    </section>
  );
}
