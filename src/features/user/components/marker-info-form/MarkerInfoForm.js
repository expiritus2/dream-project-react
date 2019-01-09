import React from "react";
import { AutocompleteInput } from "components/inputs";

const offsetLeft = 30;

const autocompleteMenuStyles = {
  borderRadius: "3px",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 2px 12px",
  background: "rgba(255, 255, 255, 0.9)",
  padding: "2px 0px",
  fontSize: "90%",
  position: "fixed",
  overflow: "auto",
  maxHeight: "50%",
  left: `${offsetLeft}px`,
  top: undefined,
  minWidth: "181px",
  width: `calc(100% - ${offsetLeft * 2}px)`,
};

const MarkerInfoForm = ({
  autocompleteNames,
  setNewMarkerName,
  title,
  autocompleteRef,
}) => {
  return (
    <>
      <AutocompleteInput
        items={autocompleteNames}
        menuStyle={autocompleteMenuStyles}
        wrapperStyle={{ width: "100%" }}
        inputProps={{ className: "marker-title-input" }}
        onChange={event => setNewMarkerName(event.target.value)}
        onSelect={val => setNewMarkerName(val)}
        value={title}
        ref={autocompleteRef}
      />
    </>
  );
};

export default MarkerInfoForm;
