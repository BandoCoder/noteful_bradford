import { Component } from "react";
import { NavLink, Link } from "react-router-dom";

export default class FolderList extends Component {
  render() {
    return (
      <aside className="folders">
        <ul className="folderListNav">
          {this.props.folders.map((folder) => (
            <li key={folder.id} className="folder">
              <NavLink className="folderListLink" to={`/folder/${folder.id}`}>
                {folder.name}
              </NavLink>
            </li>
          ))}
          <li>
            <div className="folder">
              <Link to="/AddFolder">Add Folder</Link>
            </div>
          </li>
        </ul>
      </aside>
    );
  }
}

FolderList.defaultProps = {
  folders: [],
};
