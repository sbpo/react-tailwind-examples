import React, { Component } from "react";

class SearchContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focusedBox: ""
    };

    this.blurSearch = this.blurSearch.bind(this);
    this.focusSearch = this.focusSearch.bind(this);
  }
  blurSearch(e) {
    e.preventDefault();
    this.setState({
      focusedBox: ""
    });
  }
  focusSearch(box) {
    this.setState({
      focusedBox: box
    });
  }
  render() {
    const { focusedBox } = this.state;
    return (
      <div>
        {this.props.children(this.focusSearch, this.blurSearch, focusedBox)}
      </div>
    );
  }
}

export default SearchContainer;
