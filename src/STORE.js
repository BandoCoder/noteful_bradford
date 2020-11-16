import React from "react";

const StoreContext = React.createContext({
  folders: [],
  notes: [],
  deleteNote: () => {},
  addFolder: () => {},
  addNote: () => {},
  handleDeleteNote: () => {},
});

export default StoreContext;
