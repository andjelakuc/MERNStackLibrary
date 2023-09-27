import React, { useEffect } from "react";
import { message, Modal, Table } from "antd";
import { GetIssues } from "../../../apicalls/issues";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import Button from "../../../components/Button";

function IssuedBooks({ showIssuedBooks, setShowIssuedBooks, selectedUser }) {
  const [issuedBooks, setIssuedBooks] = React.useState([]);
  const dispatch = useDispatch();
  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        user: selectedUser._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssuedBooks(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Knjiga",
      dataIndex: "book",
      render: (book) => book.title,
    },
    {
      title: "Datum pozajmljivanja",
      dataIndex: "issueDate",
      render: (issueDate) => moment(issueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Rok za vraćanje",
      dataIndex: "returnDate",
      render: (dueDate) => moment(dueDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Kazna za prekoračenje roka",
      dataIndex: "fine",
    },
    {
      title: "Datum vraćanja",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if (returnedDate) {
          return moment(returnedDate).format("DD-MM-YYYY hh:mm A");
        } else {
          return "Knjiga nije vraćena";
        }
      },
    },
  ];
  return (
    <Modal
      open={showIssuedBooks}
   
      onCancel={() => setShowIssuedBooks(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-black mb-1 text-xl text-center font-bold">
        Pozajmice korisnika {selectedUser.name}
      </h1>

        <Table columns={columns} dataSource={issuedBooks} />
    </Modal>
  );
}

export default IssuedBooks;