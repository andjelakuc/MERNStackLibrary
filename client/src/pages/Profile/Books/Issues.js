import { Modal, Table, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { GetIssues } from "../../../apicalls/issues";
import moment from "moment";
import Button from "../../../components/Button";

function Issues({ open = false, setOpen, selectedBook }) {
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
      title: "Iznos",
      dataIndex: "rent",
      render: (rent, record) => (
        <div className="flex flex-col">
          <span>Iznajmljivanje : {record.rent} RSD</span>
          <span className="text-xs text-gray-500">
            Prekoračenje : {record.fine || 0} RSD
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
                title="Obnovi"
                onClick={() => {
                  setSelectedIssue(record);
                  setShowIssueForm(true);
                }}
                //variant="outlined"
              />
              <Button
                title="Vrati"
                //onClick={() => onReturnHandler(record)}
                //variant="outlined"
              />
              <i
                className="ri-delete-back-2-line"
                //onClick={() => }
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
      width={1400}
      centered
    >
      <h1 className="text-xl mt-1 mb-1 text-black uppercase font-bold text-center">
        Pozajmice knjige {selectedBook.title}
      </h1>
      <Table columns={columns} dataSource={issues} />
    </Modal>
  );
}

export default Issues;
