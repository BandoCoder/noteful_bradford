import React from "react";
import { Route, Link } from "react-router-dom";
import FolderList from "./components/FolderList";
import NoteList from "./components/NoteList";
import AddNoteForm from "./components/AddNoteForm";
import AddFolder from "./components/AddFolder";
import NotePage from "./components/NotePage";
import { getNotesForFolder, findNote } from "./noteHelpers";
import STORE from "./STORE";
import "./App.css";

class App extends React.Component {
  state = { ...STORE };
  render() {
    const { notes, folders } = this.state;
    return (
      <div className="backgroundDiv">
        <main className="App">
          <header>
            <h1>
              <Link to="/">Noteful</Link>
            </h1>
          </header>
          <div className="main">
            <Route
              exact
              path={["/", "/folder/:folderId"]}
              render={(routeProps) => (
                <FolderList folders={folders} notes={notes} {...routeProps} />
              )}
            />
            <Route
              exact
              path={["/folder/:folderId", "/"]}
              render={(routeProps) => {
                const { folderId } = routeProps.match.params;
                const notesForFolder = getNotesForFolder(notes, folderId);
                return <NoteList {...routeProps} notes={notesForFolder} />;
              }}
            />
            <Route
              path="/note/:noteId"
              render={(routeProps) => {
                const { noteId } = routeProps.match.params;
                const note = findNote(notes, noteId);
                return <NotePage {...routeProps} note={note} />;
              }}
            />
            <Route exact path="/AddFolder" component={AddFolder} />
            <Route exact path="/AddNoteForm" component={AddNoteForm} />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
