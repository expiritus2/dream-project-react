import { handleActions } from "redux-actions";
import { openModal, closeModal } from "./actions";

const initialState = {
  isOpen: false,
  content: null,
  title: "",
};

const modal = handleActions(
  {
    [openModal]: (state, action) => ({
      ...state,
      isOpen: true,
      title: action.payload.title,
      content: action.payload.content,
    }),
    [closeModal]: state => ({
      ...state,
      isOpen: false,
      title: "",
      content: null,
    }),
  },
  initialState,
);

export default modal;
