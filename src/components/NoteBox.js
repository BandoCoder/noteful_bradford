import React from "react";
import { NavLink } from "react-router-dom";
import StoreContext from "../STORE";
import PropTypes from "prop-types";
import config from "../config";

export default class NoteBox extends React.Component {
  static defaultProps = {
    onDeleteNote: () => {},
  };
  static contextType = StoreContext;

  handleDeleteNote = (e) => {
    e.preventDefault();
    const noteId = this.props.id;

    fetch(`${config.NOTES_ENDPOINT}/${noteId}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(() => {
        this.context.deleteNote(noteId);
        this.props.onDeleteNote(noteId);
      })
      .catch((error) => this.setState({ error }));
  };

  render() {
    const { name, id } = this.props;
    return (
      <NavLink className="link" to={`/note/${id}`}>
        <div className="noteBox">
          <h1 className="noteTitle">{name}</h1>
          <button
            className="deleteBtn"
            type="button"
            onClick={this.handleDeleteNote}
          >
            Del
          </button>
        </div>
      </NavLink>
    );
  }
}

NoteBox.propTypes = {
  notes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      modified: PropTypes.number,
      folderId: PropTypes.string.isRequired,
      content: PropTypes.string,
    })
  ),
};
