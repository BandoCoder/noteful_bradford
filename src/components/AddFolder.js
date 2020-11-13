import React from "react";
import GoBack from "./GoBack";

export default class AddFolder extends React.Component {
  render() {
    return (
      <div className="folder">
        <label htmlFor="folder">Folder Name</label>
        <input name="folder" />
        <aside>
          <GoBack history={this.props.history} />
        </aside>
      </div>
    );
  }
}
