import React, { useState, useCallback, useRef } from "react";
import MarkerInfoForm from "./MarkerInfoForm";

const MarkerInfoFormContainer = ({
  autocompleteNames,
  setTitleToMarker,
  setFilesAsDataURLToMarker,
  deletePreviewImageOnMarker,
  images,
  title,
}) => {
  const filesRef = useRef();

  const [titleValue, setTitleValue] = useState(title);
  const [dateValue, setDateValue] = useState(new Date());
  const [filesAsDataURL, setFilesAsDataURL] = useState(images);

  const setFieldValueToFormik = useCallback((value, form, field) => {
    form.setFieldValue([field.name], value);
  });

  const onChangeTitle = useCallback((title, form, field) => {
    setFieldValueToFormik(title, form, field);
    setTitleValue(title);
    setTitleToMarker(title);
  });

  const onChangeDate = useCallback((date, form, field) => {
    setFieldValueToFormik(date, form, field);
    setDateValue(date);
  });

  const onChangeFiles = useCallback((files, form, field) => {
    setFieldValueToFormik(files, form, field);
    const reader = new FileReader();
    const filesDataURL = [];
    const readFile = index => {
      if (index >= files.length) {
        setFilesAsDataURL(filesDataURL);
        setFilesAsDataURLToMarker(filesDataURL);
        return;
      }
      const file = files[index];
      reader.onload = e => {
        const dataURL = e.target.result;
        filesDataURL.push(dataURL);
        readFile(index + 1);
      };
      reader.readAsDataURL(file);
    };
    readFile(0);
  });

  const onClickDeletePreviewImage = useCallback(
    (previewImageIndex, form, field) => {
      const copyFilesAsDataUrl = [...filesAsDataURL];

      copyFilesAsDataUrl.splice(previewImageIndex, 1);
      filesRef.current.state.files.splice(previewImageIndex, 1);

      setFieldValueToFormik(copyFilesAsDataUrl, form, field);
      setFilesAsDataURL(copyFilesAsDataUrl);
      deletePreviewImageOnMarker(previewImageIndex);
    },
    [filesRef, filesAsDataURL],
  );

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
      onClickDeletePreviewImage={onClickDeletePreviewImage}
      filesRef={filesRef}
    />
  );
};

export default MarkerInfoFormContainer;
