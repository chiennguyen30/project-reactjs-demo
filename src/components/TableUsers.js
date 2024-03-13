import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ModalAddNew } from "./ModalAddNew";
import { ModalEditUser } from "./ModalEditUser";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import _ from "lodash";
import { ModalConfirm } from "./ModalConfirm";
export const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const handleEditFormModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    let index = listUser.findIndex((item) => item.id === user.id);
    cloneListUser[index].first_name = user.first_name;
    setListUser(cloneListUser);
  };
  const handleDeleteUserFormModal = (user) => {
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = cloneListUser.filter((item) => item.id !== user.id);
    setListUser(cloneListUser);
  };

  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUser(res.data);
    }
  };
  const handlePageClick = (even) => {
    getUsers(+even.selected + 1);
  };

  const handleClose = () => {
    setIsShowModal(false);
    setIsShowModalEdit(false);
    setIsShowModalDelete(false);
  };
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleEditUser = (user) => {
    setDataUserEdit(user);
    setIsShowModalEdit(true);
  };

  const handleDelete = (user) => {
    setIsShowModalDelete(true);
    setDataUserDelete(user);
  };

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>
          <h3>List users:</h3>
        </span>
        <button className="btn btn-primary" onClick={() => setIsShowModal(true)}>
          Add new user
        </button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => {
              return (
                <tr key={`users-${index}`}>
                  <td>{item.id}</td>
                  <td>{item.email}</td>
                  <td>{item.first_name}</td>
                  <td>{item.last_name}</td>
                  <td>
                    <button className="btn btn-warning" onClick={() => handleEditUser(item)}>
                      Edit
                    </button>
                    &nbsp;|&nbsp;
                    <button className="btn btn-danger" onClick={() => handleDelete(item)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={totalPages}
        previousLabel="< previous"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
      />

      <ModalAddNew
        show={isShowModal}
        handleClose={handleClose}
        handleUpdateTable={handleUpdateTable}
      />
      <ModalEditUser
        show={isShowModalEdit}
        handleClose={handleClose}
        dataUserEdit={dataUserEdit}
        handleEditFormModal={handleEditFormModal}
      />
      <ModalConfirm
        show={isShowModalDelete}
        handleClose={handleClose}
        dataUserDelete={dataUserDelete}
        handleDeleteUserFormModal={handleDeleteUserFormModal}
      />
    </>
  );
};
