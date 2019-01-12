import React from "react";
import { AutocompleteInput } from "components/inputs";
import { Formik, Field } from "formik";
import DatePicker from "react-datepicker";
import {
  autocompleteMenuStyles,
  MarkerInfoFormValidationSchema,
} from "features/user/selectors";
import Files from "react-files";
import { uniqueId } from "lodash-es";

const MarkerInfoForm = ({
  autocompleteNames,
  setFieldValueToFormik,
  onChangeTitle,
  onChangeDate,
  onChangeFiles,
  titleValue,
  dateValue,
  filesAsDataURL,
}) => {
  return (
    <>
      <Formik
        initialValues={{ title: titleValue, date: dateValue, files: [] }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={MarkerInfoFormValidationSchema}
        render={formikProps => (
          <form onSubmit={formikProps.handleSubmit}>
            <Field
              name="title"
              render={({ form, field }) => (
                <>
                  <AutocompleteInput
                    items={autocompleteNames}
                    menuStyle={autocompleteMenuStyles}
                    wrapperStyle={{ width: "100%" }}
                    inputProps={{ className: "marker-title-input" }}
                    onChange={event =>
                      onChangeTitle(event.target.value, form, field)
                    }
                    onSelect={val => onChangeTitle(val, form, field)}
                    value={titleValue}
                  />
                  {field && form.errors[field.name] && (
                    <div className="err-msg">{form.errors[field.name]}</div>
                  )}
                </>
              )}
            />
            <Field
              name="date"
              render={({ form, field }) => (
                <>
                  <DatePicker
                    selected={dateValue}
                    onChange={date => onChangeDate(date, form, field)}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                    dropdownMode="scroll"
                  />
                  {field &&
                    form.touched[field.name] &&
                    form.errors[field.name] && (
                      <div className="err-msg">{form.errors[field.name]}</div>
                    )}
                </>
              )}
            />
            <Field
              name="files"
              render={({ form, field }) => (
                <>
                  <Files
                    className="files-dropzone"
                    onChange={files => onChangeFiles(files, form, field)}
                    onError={e => console.log("filesError", e)}
                    accepts={["image/png", "image/jpg", "image/jpeg"]}
                    multiple
                    minFileSize={0}
                    clickable
                  >
                    Drop files here or click to upload
                  </Files>
                  <div className="preview-files">
                    {filesAsDataURL &&
                      filesAsDataURL.map(fileURL => (
                        <div
                          key={`file-${uniqueId()}`}
                          className="preview-files__image-wrapper"
                        >
                          <img
                            className="preview-files__image"
                            src={fileURL}
                            alt=""
                          />
                        </div>
                      ))}
                  </div>
                </>
              )}
            />
            <button type="submit">Submit</button>
          </form>
        )}
      />
    </>
  );
};

export default MarkerInfoForm;
