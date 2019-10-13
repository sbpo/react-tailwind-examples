import React from "react";
import PropTypes from "prop-types";

const InputBox = props => {
  const { labelText } = props;
  return (
    <div className="flex items-center py-4">
      <div className="uppercase flex-none w-32 font-bold text-xs">
        {labelText}
      </div>
      <div className="flex-grow relative">{props.children}</div>
    </div>
  );
};

InputBox.propTypes = {
  labelText: PropTypes.string.isRequired
};

export default InputBox;
