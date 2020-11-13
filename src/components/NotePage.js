import { Component } from "react";
import NoteBox from "./NoteBox";
import StoreContext from "../STORE";
import { findNote } from "../noteHelpers";
import GoBack from "./GoBack";

export default class NotePage extends Component {
  static contextType = StoreContext;
  static defaultProps = {
    match: {
      params: {},
    },
  };
  render() {
    const { notes = [] } = this.context;
    const { noteId } = this.props.match.params;
    const note = findNote(notes, noteId) || { content: "" };
    return (
      <div>
        <section className="noteBoxExpanded">
          <NoteBox id={note.id} name={note.name} />
          <p>{note.content}</p>
        </section>
        <aside>
          <GoBack history={this.props.history} />
        </aside>
      </div>
    );
  }
}
