import React, { useState } from "react";
import { array, object } from "prop-types";
import Autocomplete from "react-autocomplete";
import { uniqueId } from "lodash-es";

const AutocompleteInput = ({
  items,
  menuStyle,
  onChange,
  onSelect,
  ...props
}) => {
  const [value, setValue] = useState(props.value);

  return (
    <Autocomplete
      getItemValue={item => item.label}
      shouldItemRender={(item, value) =>
        item.label.toLowerCase().indexOf(value.toLowerCase()) > -1
      }
      renderItem={(item, isHighlighted) => (
        <div
          key={`item.label-${uniqueId()}`}
          style={{ background: isHighlighted ? "lightgray" : "white" }}
        >
          {item.label}
        </div>
      )}
      menuStyle={menuStyle}
      items={items}
      value={value}
      onChange={e => {
        setValue(e.target.value);
        onChange(e);
      }}
      onSelect={val => {
        setValue(val);
        onSelect(val);
      }}
      {...props}
    />
  );
};

AutocompleteInput.propTypes = {
  items: array,
  menuStyle: object,
};

AutocompleteInput.defaultProps = {
  items: [],
  manuStyle: null,
};

export default AutocompleteInput;
