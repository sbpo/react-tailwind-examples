import React, { Component } from "react";
import PropTypes from "prop-types";

class Dropzone extends Component {
  constructor(props) {
    super(props);
    this.state = { dropHovered: false };
    this.onDrop = this.onDrop.bind(this);
    this.fileInputRef = React.createRef();
  }
  onDrop(event) {
    const { onFileAdded } = this.props;
    event.preventDefault();
    this.setState({ dropHovered: false });
    const files = event.dataTransfer.files;
    onFileAdded(files);
  }

  render() {
    const { dropHovered } = this.state;
    const { onFileAdded } = this.props;
    return (
      <div
        onDrop={this.onDrop}
        onDragOver={event => {
          this.setState({ dropHovered: true });
          event.preventDefault();
        }}
        onDragLeave={() => {
          this.setState({ dropHovered: false });
        }}
        className=""
      >
        <input
          className="hidden"
          ref={this.fileInputRef}
          type="file"
          onChange={e => {
            onFileAdded(e.target.files);
          }}
        />
        {this.props.children({
          dropHovered,
          clickToAdd: () => this.fileInputRef.current.click()
        })}
      </div>
    );
  }
}

Dropzone.propTypes = {
  onFileAdded: PropTypes.func
};

export default Dropzone;
