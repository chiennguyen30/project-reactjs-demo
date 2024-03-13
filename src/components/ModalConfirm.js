import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";
export const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFormModal } = props;
  const handleConfirmDelete = async () => {
    let res = await deleteUpdateUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success("Delete user successfully!!");
      handleClose();
      handleDeleteUserFormModal(dataUserDelete);
    } else {
      toast.error("Delete user failed!!");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header style={{ background: "red", color: "#fff" }} closeButton>
          <Modal.Title>Delete new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-delete-user">
            <p>This action can't be undone! Do you want to delete this user</p> <br /> email =
            <b> {dataUserDelete.email}?</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleConfirmDelete();
            }}
          >
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
