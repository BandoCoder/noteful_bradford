import { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import StoreContext from "../STORE";

export default class FolderList extends Component {
  static contextType = StoreContext;

  render() {
    const { folders = [] } = this.context;
    return (
      <aside className="folders">
        <ul className="folderListNav">
          {folders.map((folder) => (
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
