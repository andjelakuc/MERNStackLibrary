import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";
import DetailsForm from "./DetailsForm";
import { GetLoggedInUserDetails } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { message } from "antd";

function BasicDetails() {
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [user, setUser] = React.useState([]);
  const [openDetailsForm, setOpenDetailsForm] = React.useState(false);
  const dispatch = useDispatch();

  const getUser = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        setUser(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="h-75 flex-col">
      <div className="flex justify-center">
        <div className="rounded bg-primary text-black flex flex-col p-2 w-50">
          <div className="flex justify-between">
            <h1 className="text-md">Ime i prezime:</h1>
            <h1 className="text-md">{user.name}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-md">Email adresa:</h1>
            <h1 className="text-md">{user.email}</h1>
          </div>
          <div className="flex justify-between">
            <h1 className="text-md">Telefon:</h1>
            <h1 className="text-md">{user.phone}</h1>
          </div>
          {user.role === "patron" && (
            <div className="flex justify-between">
              <h1 className="text-md">Članarina:</h1>
              <h1 className="text-md">
                {user.status === "pending"
                  ? "Nije plaćena - 500 RSD"
                  : "Plaćena"}
              </h1>
            </div>
          )}

          <div className="flex justify-between">
            <h1 className="text-md">Datum registracije:</h1>
            <h1 className="text-md">
              {moment(user.createdAt).format("MMM Do YYYY")}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-1">
        <Button
          title="Izmeni"
          color="fourth"
          onClick={() => {
            setOpenDetailsForm(true);
            setSelectedDetails(user);
          }}
        />
      </div>
      {openDetailsForm && (
        <DetailsForm
          open={openDetailsForm}
          setOpen={setOpenDetailsForm}
          reloadUser={getUser}
          selectedDetails={selectedDetails}
          setSelectedDetails={setSelectedDetails}
        />
      )}
    </div>
  );
}

export default BasicDetails;
