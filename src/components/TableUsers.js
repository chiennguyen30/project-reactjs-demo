import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ModalAddNew } from "./ModalAddNew";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";

export const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getUsers(1);
  }, []);
  const getUsers = async (page) => {
    let res = await fetchAllUser(page);
    if (res && res.data) {
      console.log(res);
      setTotalUsers(res.total);
      setTotalPages(res.total_pages);
      setListUser(res.data);
    }
  };
  const handlePageClick = (even) => {
    getUsers(+even.selected + 1);
  };
  const [isShowModal, setIsShowModal] = useState(false);
  const handleClose = () => {
    setIsShowModal(false);
  };
  const handleUpdateTable = (user) => {
    setListUser([user, ...listUser]);
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

      <ModalAddNew show={isShowModal} handleClose={handleClose} updateUser={handleUpdateTable} />
    </>
  );
};
