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
        <div className="modal__inner-holder">
          <div className="modal__title">{title}</div>
          <div className="modal__content">{content}</div>
          <button className="modal__close" type="button" onClick={closeModal}>
            &times;
          </button>
        </div>
      </div>
    </>
  );
};

export default Modal;
