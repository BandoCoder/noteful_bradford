import React from "react";
import { Route, NavLink } from "react-router-dom";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";
import AddNoteForm from "./components/AddNoteForm";
import AddFolder from "./components/AddFolder";
import NotePage from "./components/NotePage";
import StoreContext from "./STORE";
import Error from "./ErrorBoundary";
import config from "./config";
import "./App.css";

class App extends React.Component {
  state = {
    folders: [],
    notes: [],
    error: null,
  };

  setFolders = (folders) => {
    this.setState({
      folders,
    });
  };

  setNotes = (notes) => {
    this.setState({
      notes,
    });
  };

  addFolder = (folder) => {
    this.setState({
      folders: [...this.state.folders, folder],
    });
  };

  addNote = (note) => {
    this.setState({
      notes: [...this.state.notes, note],
    });
  };

  componentDidMount() {
    fetch(config.FOLDERS_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setFolders)
      .catch((error) => this.setState({ error }));

    fetch(config.NOTES_ENDPOINT, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(this.setNotes)
      .catch((error) => this.setState({ error }));
  }

  handleDeleteNote = (noteId) => {
    this.setState({
      notes: this.state.notes.filter((note) => note.id !== noteId),
    });
  };
  render() {
    const { error } = this.state;
    const contextValue = {
      folders: this.state.folders,
      notes: this.state.notes,
      deleteNote: this.handleDeleteNote,
      addFolder: this.addFolder,
      addNote: this.addNote,
    };
    return (
      <StoreContext.Provider value={contextValue}>
        <div className="backgroundDiv">
          <main className="App">
            <Error>
              <header>
                <div className="AddFolder__error" role="alert">
                  {error && <p>{error.message}</p>}
                </div>
                <h1>
                  <NavLink className="header" to="/">
                    Noteful
                  </NavLink>
                </h1>
              </header>
              <NavLink className="AddNoteBox" to="/AddNoteForm">
                Add Note
              </NavLink>
              <div className="main">
                <Route
                  exact
                  path={["/", "/folder/:folderId"]}
                  component={FolderList}
                />
                <Route
                  exact
                  path={["/folder/:folderId", "/"]}
                  component={NoteList}
                />
                <Route path="/note/:noteId" component={NotePage} />
                <Route exact path="/AddFolder" component={AddFolder} />
                <Route exact path="/AddNoteForm" component={AddNoteForm} />
              </div>
            </Error>
          </main>
        </div>
      </StoreContext.Provider>
    );
  }
}

export default App;
