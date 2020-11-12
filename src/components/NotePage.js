import { Component } from "react";
import NoteBox from "./NoteBox";
import GoBack from "./GoBack";

export default class NotePage extends Component {
  render() {
    return (
      <div>
        <section className="noteBoxExpanded">
          <NoteBox />
          <p>Description Description DescriptionDescriptionDescript</p>
        </section>
        <aside>
          <GoBack history={this.props.history} />
        </aside>
      </div>
    );
  }
}
