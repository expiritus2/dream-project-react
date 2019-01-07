import React from "react";
import classnames from "classnames";

const Modal = ({ isOpen, title, content, closeModal }) => {
  return (
    <>
      <div
        className={classnames("opacity-layer", { open: isOpen })}
        onClick={closeModal}
      />
      <div className={classnames("modal", { open: isOpen })}>
        <div className="modal__title">{title}</div>
        <div className="modal__content">{content}</div>
        <button type="button" onClick={closeModal}>
          &times;
        </button>
      </div>
    </>
  );
};

export default Modal;
