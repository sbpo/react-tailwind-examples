import React from "react";

const SuggestionDropdown = props => {
  const { results, alreadyAdded, onAdd, onRemove } = props;
  return (
    <div
      className={`absolute py-2 z-10 bg-gray-400 mt-3 w-full rounded-lg shadow-lg`}
    >
      {results.map((result, i) => {
        let disabled = false;
        if (alreadyAdded && alreadyAdded.some(term => result.id === term.id))
          disabled = alreadyAdded.some(term => result.id === term.id);
        return (
          <div
            key={i}
            className={`px-4 py-2 hover:bg-gray-500 rounded-lg cursor-pointer ${
              disabled ? "opacity-50" : ""
            }`}
            onClick={() => {
              if (disabled) onRemove(result);
              else onAdd(result);
            }}
            onMouseDown={e => e.preventDefault()}
          >
            <span className="title flex-grow truncate">{result.text}</span>
          </div>
        );
      })}
    </div>
  );
};

SuggestionDropdown.propTypes = {};

export default SuggestionDropdown;
