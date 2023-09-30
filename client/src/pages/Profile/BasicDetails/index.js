import moment from "moment";
import React from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/Button";

function BasicDetails() {
  const { user } = useSelector((state) => state.users);
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
          <div className="flex justify-between">
            <h1 className="text-md">Članarina:</h1>
            <h1 className="text-md">
              {user.status === "pending" ? "Nije plaćena - 500 RSD" : "Plaćena"}
            </h1>
          </div>

          <div className="flex justify-between">
            <h1 className="text-md">Datum registracije:</h1>
            <h1 className="text-md">
              {moment(user.createdAt).format("MMM Do YYYY")}
            </h1>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-1">
        <Button title="Izmeni" color="fourth" />
      </div>
    </div>
  );
}

export default BasicDetails;
