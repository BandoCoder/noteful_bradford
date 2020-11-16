import React from "react";
import GoBack from "./GoBack";
import StoreContext from "../STORE";
import config from "../config";
import PropTypes from "prop-types";

export default class AddFolder extends React.Component {
  static contextType = StoreContext;
  state = {
    error: null,
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const name = e.target.folderName.value;
    const folder = {
      name: name,
    };
    this.setState({ error: null });
    fetch(config.FOLDERS_ENDPOINT, {
      method: "POST",
      body: JSON.stringify(folder),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then((error) => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then((folder) => {
        this.props.history.push("/");
        this.context.addFolder(folder);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    return (
      <div className="folderAdd">
        <form
          className="addFolderForm"
          id="addFolderForm"
          onSubmit={(e) => this.handleSubmit(e)}
        >
          <div className="AddFolder__error" role="alert">
            {error && <p>{error.message}</p>}
          </div>
          <label htmlFor="folder">Folder Name: </label>
          <input type="text" name="folderName" id="folderName" />
          <button className="submit" type="submit">
            Submit
          </button>
        </form>
        <GoBack history={this.props.history} />
      </div>
    );
  }
}

AddFolder.propTypes = {
  folder: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};
