import { Component } from "react";
import GoBack from "./GoBack";
import StoreContext from "../STORE";
import config from "../config";
import PropTypes from "prop-types";

export default class AddNoteForm extends Component {
  static contextType = StoreContext;
  state = {
    error: null,
  };

  submitNoteForm = (e) => {
    e.preventDefault();
    const name = e.target.title.value;
    const content = e.target.content.value;
    const folderId = e.target.folderDrop.value;
    const note = {
      name: name,
      content: content,
      folderId: folderId,
    };
    fetch(config.NOTES_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(note),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((note) => {
        this.props.history.push("/");
        this.context.addNote(note);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <section className="addNoteForm">
        <h3>Add Note</h3>
        <form id="addNote" onSubmit={this.submitNoteForm}>
          <div className="AddFolder__error" role="alert">
            {error && (
              <div>
                <h3>Something went wrong:</h3>
                <p>{error.message}</p>
                <a href="/">Click here to reload</a>
              </div>
            )}
          </div>
          <label htmlFor="title" className="formEls">
            Title:
          </label>
          <input type="text" name="title" className="formEls" required></input>
          <label htmlFor="content" className="formEls">
            Content:
          </label>
          <textarea type="text" name="content" className="formEls"></textarea>
          <label htmlFor="folderSelect" className="formEls">
            Folder
          </label>
          <select
            id="folderDrop"
            form="addNote"
            name="folderDrop"
            className="formEls"
          >
            <option value="None">Select one...</option>
            {this.context.folders.map((folder) => (
              <option key={folder.id} value={folder.id}>
                {folder.name}
              </option>
            ))}
          </select>
          <button type="submit" className="submit">
            Submit
          </button>
        </form>
        <GoBack history={this.props.history} />
      </section>
    );
  }
}

AddNoteForm.defaultProps = {
  note: PropTypes.shape({
    content: "No description added",
  }),
};

AddNoteForm.propTypes = {
  notes: PropTypes.shape({
    name: PropTypes.string.isRequired,
    folderId: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};
