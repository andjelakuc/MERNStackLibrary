import { Modal, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import moment from "moment";
import { ReserveBook } from "../../apicalls/reservations";

function ReservationForm({
  open = false,
  setOpen,
  selectedBook,
  setSelectedBook,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onReserve = async () => {
    try {
      dispatch(ShowLoading());
      const today = moment().format("YYYY-MM-DD");
      const response = await ReserveBook({
        book: selectedBook._id,
        user: user._id,
        reservationDate: new Date(),
        expireDate: moment(today).add(7, "days"),
        price: 50,
        status: "pending",
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getData();
        setOpen(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

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
          Rezervacija knjige
        </h1>
        <h4>Da li ste sigurni da želite da rezervišete knjigu?</h4>
      </div>
      <div className="flex justify-end gap-2 w-100 mt-2">
        <Button title="Otkaži" color="fourth" onClick={() => setOpen(false)} />
        <Button title="Potvrdi" onClick={onReserve} />
      </div>
    </Modal>
  );
}

export default ReservationForm;
