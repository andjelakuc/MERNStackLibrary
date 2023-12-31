import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { DeleteUser, GetAllUsers, UpdateUser } from "../../../apicalls/users";
import Button from "../../../components/Button";
import IssuedBooks from "./IssuedBooks";
import UsersForm from "./UsersForm";
import ReservedBooks from "./ReservedBooks";

function Users({ role }) {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [showReservedBooks, setShowResevedBooks] = useState(false);
  const [openUsersForm, setOpenUsersForm] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();
  const getUsers = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllUsers(role);
      dispatch(HideLoading());
      if (response.success) {
        setUsers(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteUser = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteUser(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getUsers();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const payFee = async (values) => {
    try {
      dispatch(ShowLoading());
      values.status = "active";
      const response = await UpdateUser(values);
      if (response.success) {
        message.success(response.message);
        getUsers();
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
    },
    {
      title: "Ime",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
    },
    {
      title: "Članarina",
      dataIndex: "status",
      render: (status, record) => {
        return (
          (record.status === "pending" && (
            <div className="flex gap-1 items-center">
              <span className="flex items-center gap-1 bg-red p-1 rounded outerline">
                Nije plaćena
              </span>
              <Button
                title="Plati"
                color="fourth"
                onClick={() => payFee(record)}
              />
            </div>
          )) ||
          (record.status === "active" && (
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-1 bg-green p-1 rounded outerline">
                Plaćena
              </span>
            </div>
          ))
        );
      },
    },
    {
      title: "",
      dataIndex: "actions",
      render: (actions, record) => (
        <div className="flex gap-1 items-center">
          <Button
            title="Knjige"
            color="secondary"
            onClick={() => {
              setSelectedUser(record);
              setShowIssuedBooks(true);
            }}
          />
          <Button
            title="Rezervacije"
            color="secondary"
            onClick={() => {
              setSelectedUser(record);
              setShowResevedBooks(true);
            }}
          />
          <Button
            title="Obriši"
            color="red"
            onClick={() => deleteUser(record._id)}
          />
          {/* <i
            className="ri-delete-bin-2-line"
            onClick={() => deleteUser(record._id)}
          ></i> */}
        </div>
      ),
    },
  ];
  return (
    <div className="h-screen">
      <div className="flex justify-end">
        <Button
          title="Dodaj korisnika"
          color="fourth"
          onClick={() => setOpenUsersForm(true)}
        />
      </div>
      <Table dataSource={users} columns={columns} className="mt-1" />
      {showIssuedBooks && (
        <IssuedBooks
          showIssuedBooks={showIssuedBooks}
          setShowIssuedBooks={setShowIssuedBooks}
          selectedUser={selectedUser}
        />
      )}

      {showReservedBooks && (
        <ReservedBooks
          showReservedBooks={showReservedBooks}
          setShowResevedBooks={setShowResevedBooks}
          selectedUser={selectedUser}
        />
      )}

      {openUsersForm && (
        <UsersForm
          open={openUsersForm}
          setOpen={setOpenUsersForm}
          reloadUsers={getUsers}
        />
      )}
    </div>
  );
}

export default Users;
