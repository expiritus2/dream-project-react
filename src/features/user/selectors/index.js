import * as Yup from "yup";

const offsetLeft = 30;

export const autocompleteMenuStyles = {
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

export const MarkerInfoFormValidationSchema = Yup.object().shape({
  title: Yup.string().required("Required"),
  date: Yup.date(),
});
