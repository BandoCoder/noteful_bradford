import React from "react";
import NoteBox from "./NoteBox";
import { getNotesForFolder } from "../noteHelpers";
import PropTypes from "prop-types";
import StoreContext from "../STORE";

export default class NoteList extends React.Component {
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
      </section>
    );
  }
}

NoteList.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.number,
      folderId: PropTypes.string.isRequired,
    })
  ),
};
