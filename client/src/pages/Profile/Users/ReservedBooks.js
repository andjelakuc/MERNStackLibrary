import React, { useEffect } from "react";
import { message, Modal, Table } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import moment from "moment";
import { GetReservations } from "../../../apicalls/reservations";
import Button from "../../../components/Button";

function ReservedBooks({ showReservedBooks, setShowResevedBooks, selectedUser }) {
  const [reservedBooks, setReservedBooks] = React.useState([]);
  const today = moment().format("YYYY-MM-DD");
  const dispatch = useDispatch();
  const getIssues = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetReservations({
        user: selectedUser._id,
      });
      dispatch(HideLoading());
      if (response.success) {
        setReservedBooks(response.data);
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
      title: "Datum rezervacije",
      dataIndex: "reservationDate",
      render: (reservationDate) => moment(reservationDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
      title: "Rok za preuzimanje",
      dataIndex: "expireDate",
      render: (expireDate) => moment(expireDate).format("DD-MM-YYYY hh:mm A"),
    },
    {
        title: "Cena rezervacije",
        dataIndex: "price",
        render: (price) => price + " RSD",
    },
    {
        title: "",
        dataIndex: "actions",
        render: (actions, record) => (
            <div className="flex gap-1 items-center">
                <Button
            title="Potvrdi"
            color="primary"
            //onClick={() => deleteUser(record._id)}
          />
            </div>

        ),
    },
  ];
  return (
    <Modal
      open={showReservedBooks}
   
      onCancel={() => setShowResevedBooks(false)}
      footer={null}
      width={1400}
    >
      <h1 className="text-black mb-1 text-xl text-center font-bold">
        Rezervacije korisnika {selectedUser.name}
      </h1>

        <Table columns={columns} dataSource={reservedBooks} />
    </Modal>
  );
}

export default ReservedBooks;