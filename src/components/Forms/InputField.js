import React, { Component } from "react";
import PropTypes from "prop-types";

class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
    this.onBlur = this.onBlur.bind(this);
    this.onFocus = this.onFocus.bind(this);
  }

  onFocus(e) {
    const { onFocus } = this.props;
    this.setState({ focused: true }, () => {
      onFocus && onFocus(e);
    });
  }

  onBlur(e) {
    const { onBlur } = this.props;
    this.setState({ focused: false }, () => {
      onBlur && onBlur(e);
    });
  }

  render() {
    const {
      value,
      handleChange,
      icon,
      error,
      placeholder,
      disabled
    } = this.props;
    let className = "input-box-container";
    error && (className += " error");
    disabled && (className += " opacity-50");

    // focused && (className += " focused");
    const { focused } = this.state;
    return (
      <div className={``}>
        <div
          className={`flex items-center bg-gray-400 rounded-lg overflow-hidden 
          ${focused ? `border-2 border-blue-400` : `border-2 border-gray-400`} 
          ${disabled ? "opacity-50" : ""}`}
        >
          <span className="ml-4">{icon && icon}</span>
          <input
            disabled={disabled}
            placeholder={placeholder}
            type="text"
            onChange={handleChange}
            className={`paragraph16 p-4 bg-gray-400 w-full outline-none`}
            value={value}
            onBlur={this.onBlur}
            onFocus={this.onFocus}
          />
        </div>
        {error && (
          <div className="error-message paragraph14">{error.message}</div>
        )}
      </div>
    );
  }
}

InputField.propTypes = {
  value: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  icon: PropTypes.object,
  error: PropTypes.object,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func
};

export default InputField;
