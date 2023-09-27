import { Modal, message } from "antd";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { GetUserById } from "../../../apicalls/users";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { IssueBook } from "../../../apicalls/issues";

function IssueForm({
  open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  getData,
  selectedIssue,
  type,
}) {
  const { user } = useSelector((state) => state.users);
  const [validated, setValidated] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [patronData, setPatronData] = useState(null);
  const [patronId, setPatronId] = React.useState("");
  const [returnDate, setReturnDate] = React.useState("");
  const dispatch = useDispatch();

  const validate = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetUserById(patronId);
      if (response.success) {
        if (response.data.role !== "patron") {
          setValidated(false);
          setErrorMessage("Korisnik nije član biblioteke");
          dispatch(HideLoading());
          return;
        } else {
          setPatronData(response.data);
          setValidated(true);
          setErrorMessage("");
        }
      } else {
        setValidated(false);
        setErrorMessage(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      setValidated(false);
      setErrorMessage(error.message);
    }
  };

  const onIssue = async () => {
    try {
      dispatch(ShowLoading());
      const today = moment().format("YYYY-MM-DD");
      const response = await IssueBook({
        book: selectedBook._id,
        user: patronData._id,
        issueDate: new Date(),
        returnDate: moment(today).add(15, "days"),
        rent: 0,
        fine: 0,
        issuedBy: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
        setPatronId("");
        setReturnDate("");
        setValidated(false);
        setErrorMessage("");
        setSelectedBook(null);
        setOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  //   const onIssue = async () => {
  //     try {
  //       dispatch(ShowLoading());
  //       let response = null;
  //       if (type !== "edit") {
  //         response = await IssueBook({
  //           book: selectedBook._id,
  //           user: patronData._id,
  //           issueDate: new Date(),
  //           returnDate,
  //           rent:
  //             moment(returnDate).diff(moment(), "days") *
  //             selectedBook?.rentPerDay,
  //           fine: 0,
  //           issuedBy: user._id,
  //         });
  //       } else {
  //         response = await EditIssue({
  //           book: selectedBook._id,
  //           user: patronData._id,
  //           issueDate: selectedIssue.issueDate,
  //           returnDate,
  //           rent:
  //             moment(returnDate).diff(moment(), "days") *
  //             selectedBook?.rentPerDay,
  //           fine: 0,
  //           issuedBy: user._id,
  //           _id: selectedIssue._id,
  //         });
  //       }
  //       dispatch(HideLoading());
  //       if (response.success) {
  //         message.success(response.message);
  //         getData();
  //         setPatronId("");
  //         setReturnDate("");
  //         setValidated(false);
  //         setErrorMessage("");
  //         setSelectedBook(null);
  //         setOpen(false);
  //       } else {
  //         message.error(response.message);
  //       }
  //     } catch (error) {
  //       dispatch(HideLoading());
  //       message.error(error.message);
  //     }
  //   };

  //   useEffect(() => {
  //     if (type === "edit") {
  //       validate();
  //     }
  //   }, [open]);

  //   console.log(type);

  return (
    <Modal
      title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      centered
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-black font-bold text-xl text-center">
          Izdavanje knjige
        </h1>
        <div>
          <span>ID korisnika </span>
          <input
            type="text"
            value={patronId}
            onChange={(e) => setPatronId(e.target.value)}
            placeholder="ID korisnika"
            //disabled={type === "edit"}
          />
        </div>
        <div>
          {/* <span>Datum vraćanja knjige </span> */}
          {/* <input
            type="date"
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            placeholder="Return Date"
            min={moment().format("YYYY-MM-DD")}
          /> */}
        </div>

        {errorMessage && <span className="error-message">{errorMessage}</span>}

        {validated && (
          <div className="bg-third p-1 text-black">
            <h1 className="text-sm">Korisnik : {patronData.name}</h1>
            {/* <h1>Broj dana : {moment(returnDate).diff(moment(), "days")}</h1> */}
            <h1>Knjiga : {selectedBook.title}</h1>
            <h1>Autor : {selectedBook.author}</h1>
            {/* <h1>
              Ukupno :{" "}
              {moment(returnDate).diff(moment(), "days") *
                selectedBook?.rentPerDay}{" "}
              RSD
            </h1> */}
          </div>
        )}

        <div className="flex justify-end gap-2 w-100">
          <Button
            title="Otkaži"
            color="fourth"
            onClick={() => setOpen(false)}
          />
          <Button
            title="Potvrdi"
            //disabled={patronId === "" || returnDate === ""}
            disabled={patronId === ""}
            onClick={validate}
          />
          {/* {type === "add" && (
            <Button
              title="Validate"
              disabled={patronId === "" || returnDate === ""}
              onClick={validate}
            />
          )} */}
          {validated && (
            <Button
              title="Pozajmi"
              //title={type === "edit" ? "Edit" : "Issue"}
              onClick={onIssue}
              //disabled={patronId === "" || returnDate === ""}
              disabled={patronId === ""}
            />
          )}
        </div>
      </div>
    </Modal>
  );
}

export default IssueForm;
