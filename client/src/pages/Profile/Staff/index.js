import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { DeleteUser, GetAllUsers } from "../../../apicalls/users";
import Button from "../../../components/Button";
import StaffForm from "./StaffForm";

function Staff({ role }) {
    const [formType, setFormType] = useState("librarian");
    const [selectedUser, setSelectedUser] = useState(null);
  const [showIssuedBooks, setShowIssuedBooks] = useState(false);
  const [openStaffForm, setOpenStaffForm] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const dispatch = useDispatch();

  const getStaff = async () => {
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
        getStaff();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getStaff();
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
        title: "",
        dataIndex: "actions",
        render: (actions, record) => (
            <div className="flex gap-1 items-center">
              <Button
                title="Obriši"
                color="red"
                onClick={() => deleteUser(record._id)}
              />
            </div>
          ),
      },
  ]

  return (
    
    <div className="h-screen">
      <div className="flex justify-end">
        <Button
          title={role === "admin" ? "Dodaj admina" : "Dodaj bibliotekara"}
          color="fourth"
          onClick={() => {
            {role === "admin" ? setFormType("admin") : setFormType("librarian")}
            setOpenStaffForm(true);
          }}
        />
      </div>
      <Table dataSource={users} columns={columns} className="mt-1" />

      {openStaffForm && (
        <StaffForm
          open={openStaffForm}
          setOpen={setOpenStaffForm}
          reloadStaff={getStaff}
          formType={formType}
        />
      )}
    </div>
  );
}

export default Staff