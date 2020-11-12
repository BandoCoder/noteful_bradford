import React from "react";

export default function GoBack(props) {
  return (
    <aside className="folderGoBack">
      <button
        className="folder"
        id="goBack"
        onClick={() => props.history.goBack()}
      >
        <h4>Go Back</h4>
      </button>
    </aside>
  );
}
