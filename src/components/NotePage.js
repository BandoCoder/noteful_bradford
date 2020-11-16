import { Component } from "react";
import StoreContext from "../STORE";
import { findNote } from "../noteHelpers";
import GoBack from "./GoBack";
import PropTypes from "prop-types";

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
          <h1>{note.name}</h1>
          <p>{note.content}</p>
          <GoBack history={this.props.history} />
        </section>
      </div>
    );
  }
}

NotePage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),

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
