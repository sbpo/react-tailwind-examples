import React, { Component } from "react";
import PropTypes from "prop-types";
import InputBox from "./InpuxBox";
import SearchContainer from "./SearchContainer";
import InputField from "./InputField";
import SuggestionDropdown from "./SuggestionDropdown";
import { locations } from "./locations";
import MaterialIcon from "@material/react-material-icon";

class InputExample extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationValue: "",
      locationResults: [],
      locations: []
    };
    this.handleSearchLocation = this.handleSearchLocation.bind(this);
    this.onAddLocation = this.onAddLocation.bind(this);
    this.onRemoveLocation = this.onRemoveLocation.bind(this);
  }

  handleSearchLocation(e) {
    const term = e.target.value;
    const searchResult = term.length > 0 ? getLocation(term) : [];
    this.setState({
      locationValue: term,
      locationResults: searchResult
    });
  }

  onAddLocation(location) {
    this.setState({ locations: [...this.state.locations, location] });
  }

  onRemoveLocation(location) {
    this.setState({
      locations: this.state.locations.filter(loc => loc.id !== location.id)
    });
  }

  render() {
    const { locationValue, locationResults, locations } = this.state;
    return (
      <div className="md:w-2/3 xl:w-1/2 w-full px-8 relative">
        <div className=" flex flex-wrap w-full">
          {locations.map(location => (
            <Tag
              key={location.id}
              text={location.text}
              onRemove={() => this.onRemoveLocation(location)}
            />
          ))}
        </div>
        <SearchContainer>
          {(focusSearch, blurSearch, focusedBox) => (
            <InputBox labelText="LOCATIONS">
              <InputField
                icon={<div type="search" />}
                value={locationValue}
                placeholder="Search locations"
                handleChange={this.handleSearchLocation}
                onBlur={blurSearch}
                onFocus={() => {
                  focusSearch("location");
                }}
              />
              {locationResults.length > 0 && focusedBox === "location" && (
                <SuggestionDropdown
                  results={locationResults}
                  onAdd={this.onAddLocation}
                  onRemove={this.onRemoveLocation}
                  alreadyAdded={locations}
                />
              )}
            </InputBox>
          )}
        </SearchContainer>
      </div>
    );
  }
}

InputExample.propTypes = {};

export default InputExample;

const Tag = props => {
  const { key, text, onRemove } = props;
  return (
    <div
      key={key}
      className="px-4 py-2 bg-gray-700 text-white rounded-full mr-2 mt-2 flex items-center"
    >
      <span className="mr-1 truncate">{text}</span>
      <MaterialIcon
        icon="close"
        className="text-sm cursor-pointer"
        onClick={onRemove}
      />
    </div>
  );
};

const getLocation = searchTerm => {
  let result = locations.filter(loc =>
    loc.text.toLowerCase().includes(searchTerm.toLowerCase())
  );
  result = result.map(loc => {
    return { type: "location", text: loc.text, id: loc.id };
  });
  result.length > 6 && (result = result.slice(0, 5));
  return result;
};
