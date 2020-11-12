import { Component } from "react";
import GoBack from "./GoBack";

export default class AddNoteForm extends Component {
  render() {
    return (
      <section className="addNoteForm">
        <h3>Add Note</h3>
        <form id="addNote">
          <label htmlFor="title" className="formEls">
            Title:
          </label>
          <input type="text" name="title" className="formEls"></input>
          <label htmlFor="content" className="formEls">
            Content:
          </label>
          <textarea type="text" name="content" className="formEls"></textarea>
          <label htmlFor="folderSelect" className="formEls">
            Folder
          </label>
          <select
            id="folderDrop"
            name="folderDrop"
            className="formEls"
            onChange={(e) => this.changeSelection(e.target.value)}
          >
            <option value="None">Select one...</option>
          </select>
        </form>
        <button type="submit" className="submit">
          Submit
        </button>
        <GoBack history={this.props.history} />
      </section>
    );
  }
}
