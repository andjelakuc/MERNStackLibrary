import { Form, Modal, message } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { UpdateUser } from "../../../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function DetailsForm({
  open,
  setOpen,
  selectedDetails,
  setSelectedDetails,
  reloadUser,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values._id = user._id;
      const response = await UpdateUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        reloadUser();
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
      title="Izmenjivanje informacija"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedDetails}
        className="mt-1"
      >
        <Form.Item
          label="Ime"
          name="name"
          rules={[
            {
              required: true,
              message: "Unesite ime",
            },
          ]}
        >
          <input type="text" placeholder="Ime" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Unesite mejl adresu",
            },
          ]}
        >
          <input type="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Broj telefona"
          name="phone"
          rules={[
            {
              required: true,
              message: "Unesite broj telefona",
            },
          ]}
        >
          <input type="number" placeholder="Broj telefona" />
        </Form.Item>

        <div className="flex justify-end gap-2 w-100">
          <Button
            title="Otkaži"
            color="fourth"
            onClick={() => setOpen(false)}
          />
          <Button title="Izmeni" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default DetailsForm;
