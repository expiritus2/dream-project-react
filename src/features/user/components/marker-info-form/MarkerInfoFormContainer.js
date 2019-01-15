import React, { useState, useCallback, useRef } from "react";
import { useRedux } from "hooks";
import MarkerInfoForm from "./MarkerInfoForm";
import { setMarkersAction } from "features/user/modules/actions";

const MarkerInfoFormContainer = ({
  markerIndex,
  isMoreInfo,
  autocompleteNames,
  setTitleToMarker,
  setFilesAsDataURLToMarker,
  deletePreviewImageOnMarker,
  images,
  title,
}) => {
  const filesRef = useRef();
  const [user, actions] = useRedux("user", { setMarkersAction });

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
    const copyMarkers = [...user.markers];

    if (!isMoreInfo) {
      copyMarkers[markerIndex].images = files;
    } else {
      copyMarkers[markerIndex].images = [
        ...copyMarkers[markerIndex].images,
        ...files,
      ];
    }

    actions.setMarkersAction(copyMarkers);

    setFieldValueToFormik(filesRef.current.state.files, form, field);
    const reader = new FileReader();
    const filesDataURL = [];
    const readFile = index => {
      if (index >= copyMarkers[markerIndex].images.length) {
        setFilesAsDataURL(filesDataURL);
        setFilesAsDataURLToMarker(filesDataURL);
        return;
      }
      const file = copyMarkers[markerIndex].images[index];
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

      console.log(filesRef.current.state.files);

      setFieldValueToFormik(copyFilesAsDataUrl, form, field);
      setFilesAsDataURL(copyFilesAsDataUrl);
      deletePreviewImageOnMarker(previewImageIndex);

      const copyMarkers = [...user.markers];
      copyMarkers[markerIndex].images = filesRef.current.state.files;
      actions.setMarkersAction(copyMarkers);
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
