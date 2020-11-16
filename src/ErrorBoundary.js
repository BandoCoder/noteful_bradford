import React from "react";

export default class Error extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { error: true };
  }

  render() {
    if (this.state.error) {
      return (
        <div className="errorBoundary">
          <h1>Something went wrong, please click here to refresh</h1>
          <a href="/">Here</a>
        </div>
      );
    }
    return this.props.children;
  }
}
