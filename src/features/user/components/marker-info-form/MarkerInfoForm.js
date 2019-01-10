import React from "react";
import { AutocompleteInput } from "components/inputs";
import { Formik, Field } from "formik";
import DatePicker from "react-datepicker";
import * as Yup from "yup";

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
  zIndex: 99,
};

const ValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
});

const MarkerInfoForm = ({
  autocompleteNames,
  onChangeFormField,
  setTitleName,
  selectedDate,
  setSelectedDate,
  title,
}) => {
  return (
    <>
      <Formik
        initialValues={{ title, date: selectedDate }}
        onSubmit={values => {
          console.log(values);
        }}
        validationSchema={ValidationSchema}
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
                    onChange={event => {
                      const value = event.target.value;
                      onChangeFormField(value, form, field);
                      setTitleName(value);
                    }}
                    onSelect={val => {
                      onChangeFormField(val, form, field);
                      setTitleName(val);
                    }}
                    value={title}
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
              name="date"
              render={({ form, field }) => (
                <>
                  <DatePicker
                    selected={selectedDate}
                    onChange={value => {
                      onChangeFormField(value, form, field);
                      setSelectedDate(value);
                    }}
                    showTimeSelect
                    timeFormat="HH:mm"
                    timeIntervals={15}
                    dateFormat="MMMM d, yyyy h:mm aa"
                    timeCaption="time"
                  />
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
