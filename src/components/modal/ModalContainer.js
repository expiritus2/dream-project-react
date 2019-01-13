import React from "react";
import { useRedux } from "hooks";
import { closeModal } from "./modules/actions";
import Modal from "./Modal";

const ModalContainer = () => {
  const [modal, actions] = useRedux("modal", { closeModal });

  return (
    <Modal
      closeModal={actions.closeModal}
      title={modal.title}
      content={modal.content}
      isOpen={modal.isOpen}
    />
  );
};

export default ModalContainer;
