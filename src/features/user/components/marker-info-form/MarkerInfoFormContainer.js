import React, { useState } from "react";
import MarkerInfoForm from "./MarkerInfoForm";

const MarkerInfoFormContainer = ({
  autocompleteNames,
  setNewMarkerName,
  title,
}) => {
  const [titleName, setTitleName] = useState(title);

  return (
    <MarkerInfoForm
      autocompleteNames={autocompleteNames}
      setNewMarkerName={name => {
        setNewMarkerName(name);
        setTitleName(name);
      }}
      title={titleName}
    />
  );
};

export default MarkerInfoFormContainer;
