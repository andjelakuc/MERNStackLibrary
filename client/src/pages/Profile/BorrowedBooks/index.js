import React, { useEffect } from "react";
import { message, Table } from "antd";
import { GetIssues } from "../../../apicalls/issues";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function BorrowedBooks() {
  const { user } = useSelector((state) => state.users);
  const [BorrowedBooks, setBorrowedBooks] = React.useState([]);
  const dispatch = useDispatch();
  const today = moment().format("YYYY-MM-DD");
  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        user: user._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setBorrowedBooks(response.data);
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
      render: (fine, record) => {
        if (today > record.returnDate && !record.returnedDate) {
          return (
            (moment(today).diff(record.returnDate, "days") + 1) * 5 + " RSD"
          );
        } else {
          return record.fine + " RSD";
        }
      },
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
    <div className="h-75">
      <Table columns={columns} dataSource={BorrowedBooks} />
    </div>
  );
}

export default BorrowedBooks;
