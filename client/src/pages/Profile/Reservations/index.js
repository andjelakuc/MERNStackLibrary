import React, { useEffect } from "react";
import { message, Table } from "antd";
import { GetIssues } from "../../../apicalls/issues";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { GetReservations } from "../../../apicalls/reservations";

function ReservedBooks() {
  const { user } = useSelector((state) => state.users);
  const [reservedBooks, setReservedBooks] = React.useState([]);
  const dispatch = useDispatch();
  const today = moment().format("YYYY-MM-DD");
  const getReservations = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetReservations({
        user: user._id,
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
    getReservations();
  }, []);

  const columns = [
    {
      title: "Knjiga",
      dataIndex: "book",
      render: (book) => book.title,
    },
    {
      title: "Datum rezervacije",
      dataIndex: "reservationDate",
      render: (reservationDate) => moment(reservationDate).format("DD-MM-YYYY"),
    },
    {
      title: "Rok za preuzimanje",
      dataIndex: "expireDate",
      render: (expireDate) => moment(expireDate).format("DD-MM-YYYY"),
    },
    {
      title: "Cena rezervacije",
      dataIndex: "price",
      render: (price) => price + " RSD",
    },
  ];
  return (
    <div className="h-75">
      <Table columns={columns} dataSource={reservedBooks} />
    </div>
  );
}

export default ReservedBooks;
