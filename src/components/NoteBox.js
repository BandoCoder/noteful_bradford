import React from "react";
import { NavLink } from "react-router-dom";
import StoreContext from "../STORE";
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
      <div className="noteBox">
        <h3 className="noteTitle">
          <NavLink to={`/note/${id}`}>{name}</NavLink>
        </h3>
        <button
          className="deleteBtn"
          type="button"
          onClick={this.handleDeleteNote}
        >
          Del
        </button>
      </div>
    );
  }
}
