import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { ModalAddNew } from "./ModalAddNew";
import { ModalEditUser } from "./ModalEditUser";
import Table from "react-bootstrap/Table";
import { fetchAllUser } from "../services/UserService";
import _, { debounce } from "lodash";
import { ModalConfirm } from "./ModalConfirm";
import "./TableUser.scss";
import { CSVLink, CSVDownload } from "react-csv";
import Papa from "papaparse";
import { toast } from "react-toastify";
export const TableUsers = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowModalEdit, setIsShowModalEdit] = useState(false);
  const [isShowModalDelete, setIsShowModalDelete] = useState(false);
  const [dataUserEdit, setDataUserEdit] = useState({});
  const [dataUserDelete, setDataUserDelete] = useState({});
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [dataExport, setDataExport] = useState([]);

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

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);

    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };
  const handleSearch = debounce((e) => {
    let term = e.target.value;
    if (term) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) => item.email.includes(term));
      setListUser(cloneListUser);
    } else {
      getUsers(1);
    }
  }, 500);

  const getUsersDataExport = (even, done) => {
    const result = [];
    if (listUser && listUser.length > 0) {
      result.push(["Id", "Email", "First name", "Last name"]);
      listUser.map((item, index) => {
        let arr = [];
        arr[0] = item.id;
        arr[1] = item.email;
        arr[2] = item.first_name;
        arr[3] = item.last_name;
        result.push(arr);
      });
      setDataExport(result);
      done();
    }
  };

  const handleImportCsv = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      if (file.type !== "text/csv") {
        toast.error("Only accept text/csv files");
        return;
      }
      // Parse local CSV file
      Papa.parse(file, {
        // header: true,
        complete: function (results) {
          let rawCSV = results.data;
          if (rawCSV.length > 0) {
            if (rawCSV[0] && rawCSV[0].length === 3) {
              if (
                rawCSV[0][0] !== "email" ||
                rawCSV[0][1] !== "first_name" ||
                rawCSV[0][2] !== "last_name"
              ) {
                toast.error("Wrong format header CSV file");
              } else {
                let result = [];

                rawCSV.map((item, index) => {
                  if (index > 0 && item.length === 3) {
                    let obj = {};
                    obj.email = item[0];
                    obj.first_name = item[1];
                    obj.last_name = item[2];
                    result.push(obj);
                  }
                });
                setListUser(result);
              }
            } else {
              toast.error("Wrong format CSV file");
            }
          } else {
            toast.error("Not found data on CSV file");
          }
        },
      });
    }
  };
  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span>
          <h3>List users:</h3>
        </span>
        <div>
          <input
            type="file"
            name="filefield"
            multiple="multiple"
            id="import-file"
            hidden
            onChange={(e) => handleImportCsv(e)}
          ></input>
          <label htmlFor="import-file" className="btn btn-warning">
            <i className="fa-solid fa-file-import"></i> Import
          </label>
          <CSVLink
            data={dataExport}
            asyncOnClick={true}
            onClick={getUsersDataExport}
            filename={"data-user.csv"}
            className="btn btn-primary mx-3"
          >
            <i className="fa-solid fa-file-arrow-down"></i> Export
          </CSVLink>

          <button className="btn btn-primary" onClick={() => setIsShowModal(true)}>
            <i className="fa-solid fa-circle-plus"></i> Add new
          </button>
        </div>
      </div>
      <div className="col-3 my-3">
        <input
          onChange={(e) => handleSearch(e)}
          className="form-control"
          placeholder="search user by email..."
        />
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <div className="sort-header">
                <span>ID</span>{" "}
                <span>
                  <i
                    onClick={() => handleSort("desc", "id")}
                    className="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "id")}
                    className="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
            <th>Email</th>
            <th>
              <div className="sort-header">
                <span>First Name</span>{" "}
                <span>
                  <i
                    onClick={() => handleSort("desc", "first_name")}
                    className="fa-solid fa-arrow-down-long"
                  ></i>
                  <i
                    onClick={() => handleSort("asc", "first_name")}
                    className="fa-solid fa-arrow-up-long"
                  ></i>
                </span>
              </div>
            </th>
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
