import React, { useState, useCallback } from "react";
import MarkerInfoForm from "./MarkerInfoForm";

const MarkerInfoFormContainer = ({
  autocompleteNames,
  setNameToMarker,
  title,
}) => {
  const [titleValue, setTitleValue] = useState(title);
  const [dateValue, setDateValue] = useState(new Date());
  const [filesAsDataURL, setFilesAsDataURL] = useState(null);

  const setFieldValueToFormik = useCallback((name, form, field) => {
    form.setFieldValue([field.name], name);
  });

  const onChangeTitle = useCallback((title, form, field) => {
    setFieldValueToFormik(title, form, field);
    setTitleValue(title);
    setNameToMarker(title);
  });

  const onChangeDate = useCallback((date, form, field) => {
    setFieldValueToFormik(date, form, field);
    setDateValue(date);
  });

  const onChangeFiles = useCallback((files, form, field) => {
    setFieldValueToFormik(files, form, field);
    const binaryFilesList = [];
    files.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = () => {
        const dataURL = reader.result;
        binaryFilesList.push(dataURL);
        if (files.length - 1 === index) {
          setFilesAsDataURL(binaryFilesList);
        }
      };

      reader.readAsDataURL(file);
    });
  });

  return (
    <MarkerInfoForm
      autocompleteNames={autocompleteNames}
      setFieldValueToFormik={setFieldValueToFormik}
      onChangeTitle={onChangeTitle}
      onChangeDate={onChangeDate}
      onChangeFiles={onChangeFiles}
      titleValue={titleValue}
      dateValue={dateValue}
      filesAsDataURL={filesAsDataURL}
    />
  );
};

export default MarkerInfoFormContainer;
