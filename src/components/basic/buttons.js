import React from "react";
import PropTypes from "prop-types";

export const SmallButton = props => {
  const { onClick, text } = props;
  return (
    <button
      onClick={onClick}
      className="py-1 px-8 mt-2 rounded-full text-white bg-blue-900 focus:outline-none shadow"
    >
      {text}
    </button>
  );
};

SmallButton.propTypes = {};
