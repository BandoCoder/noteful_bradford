import { Component } from "react";
import { Link } from "react-router-dom";
import StoreContext from "../STORE";
import PropTypes from "prop-types";

export default class FolderList extends Component {
  static contextType = StoreContext;
  render() {
    const { folders = [] } = this.context;
    return (
      <aside className="folders">
        <ul className="folderListNav">
          <Link className="link" to={"/"}>
            <li key="1212" className="folder">
              All Notes
            </li>
          </Link>
          {folders.map((folder) => (
            <Link key={folder.id} className="link" to={`/folder/${folder.id}`}>
              <li key={folder.id} className="folder">
                {folder.name}
              </li>
            </Link>
          ))}
          <li key="1616">
            <Link className="link" to="/AddFolder">
              <div className="folder">Add Folder</div>
            </Link>
          </li>
        </ul>
      </aside>
    );
  }
}

FolderList.propTypes = {
  folders: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};
