import React from "react";
import NoteBox from "./NoteBox";
import { NavLink } from "react-router-dom";
import { getNotesForFolder } from "../noteHelpers";
import StoreContext from "../STORE";

export default class NoteListMain extends React.Component {
  static contextType = StoreContext;
  static defaultProps = {
    match: {
      params: {},
    },
  };

  render() {
    const { folderId } = this.props.match.params;
    const { notes = [] } = this.context;
    const notesForFolder = getNotesForFolder(notes, folderId);
    return (
      <section className="noteList">
        <ul>
          {notesForFolder.map((note) => (
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
}
