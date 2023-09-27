import { Modal, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { DeleteIssue, GetIssues, ReturnBook } from "../../../apicalls/issues";
import moment from "moment";
import Button from "../../../components/Button";

function Issues({ open = false, setOpen, selectedBook, reloadBooks }) {
  const [issues, setIssues] = React.useState([]);
  const [selectedIssue, setSelectedIssue] = React.useState(null);
  const [showIssueForm, setShowIssueForm] = React.useState(false);

  const dispatch = useDispatch();

  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetIssues({
        book: selectedBook._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setIssues(response.data);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getIssues();
  }, []);

  const onReturnHandler = async (issue) => {
    try {
      // provera da li je knjiga vraćena pre roka
      const today = moment().format("YYYY-MM-DD");
      const dueDate = moment(issue.returnDate).format("YYYY-MM-DD");
      if (today > dueDate) {
        // ako je knjiga vraćena posle isteka roka
        // računamo koliko će korisnik dodatno da plati
        const fine = moment(today).diff(dueDate, "days") * selectedBook?.rentPerDay;
        issue.fine = fine;
      }
      issue.returnedDate = new Date();
      issue.book = issue.book._id;
      dispatch(ShowLoading());
      const response = await ReturnBook(issue);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const deleteIssueHandler = async (issue) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteIssue({
        ...issue,
        book: issue.book._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getIssues();
        reloadBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "ID i ime korisnika",
      dataIndex: "_id",
      render: (_id, record) => (
        <div className="flex flex-col">
          <span>{_id}</span>
          <span className="text-xs text-gray-500">{record.user.name}</span>
        </div>
      ),
    },
    {
      title: "Datum izdavanja",
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
      render: (fine, record) => (
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">
            {record.fine || 0} RSD
          </span>
        </div>
      ),
    },
    {
      title: "Datum vraćanja",
      dataIndex: "returnedDate",
      render: (returnedDate) => {
        if (returnedDate) {
          return moment(returnedDate).format("DD-MM-YYYY hh:mm A");
        } else {
          return "Nije vraćeno";
        }
      },
    },
    {
      title: "",
      dataIndex: "action",
      render: (action, record) => {
        return (
          !record.returnedDate && (
            <div className="flex gap-1 items-center">
              <Button
                title="Vrati knjigu"
                onClick={() => onReturnHandler(record)}
              />
              <i
                className="ri-delete-bin-2-line"
                onClick={() => deleteIssueHandler(record)}
              ></i>
            </div>
          )
        );
      },
    },
  ];

  return (
    <Modal
      title=""
      open={open}
      onCancel={() => setOpen(false)}
      footer={null}
      width={1500}
      centered
    >
      <h1 className="text-xl mt-1 mb-1 text-black font-bold text-center">
        Pozajmice knjige {selectedBook.title}
      </h1>
      <Table columns={columns} dataSource={issues} />
    </Modal>
  );
}

export default Issues;
