import React, { useState } from "react";
import MarkerInfoForm from "./MarkerInfoForm";

const MarkerInfoFormContainer = ({
  autocompleteNames,
  setNewMarkerName,
  title,
}) => {
  const [titleName, setTitleName] = useState(title);
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <MarkerInfoForm
      autocompleteNames={autocompleteNames}
      onChangeFormField={(name, form, field) => {
        form.setValues({ ...form.values, [field.name]: name });
      }}
      setTitleName={name => {
        setNewMarkerName(name);
        setTitleName(name);
      }}
      selectedDate={selectedDate}
      setSelectedDate={setSelectedDate}
      title={titleName}
    />
  );
};

export default MarkerInfoFormContainer;
