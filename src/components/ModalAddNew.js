import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { CreateUser } from "../services/UserService";
import { toast } from "react-toastify";
export const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");
  const handleSaveUser = async () => {
    const res = await CreateUser(name, job);
    if (res && res.id) {
      //neu thanh cong thi` dong modal va set lai value ve rong
      handleClose();
      setName("");
      setJob("");
      //thanh cong thi se hien thong bao
      toast.success("A user is created successfully!!!");
      //update lai bang va` dua user moi tao len dau
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      toast.error("an error occurred while creating the user !!!");
    }
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static" keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="body-add-new">
            <div className="mb-3">
              <label className="form-label"> Name</label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Job</label>
              <input
                type="text"
                className="form-control"
                value={job}
                onChange={(e) => {
                  setJob(e.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              handleSaveUser();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
