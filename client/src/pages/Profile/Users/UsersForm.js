import { Form, Modal, message } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { RegisterUser } from "../../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function UsersForm({ open, setOpen, reloadUsers }) {
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser({
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
        role: values.role,
        status: "pending",
      });
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        reloadUsers();
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
      title="Dodavanje korisnika"
      open={open}
      onCancel={() => setOpen(false)}
      centered
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish} className="mt-1">
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

        <Form.Item
          label="Šifra"
          name="password"
          rules={[
            {
              required: true,
              message: "Unesite šifru",
            },
          ]}
        >
          <input type="password" placeholder="Šifra" />
        </Form.Item>

        <div className="flex justify-end gap-2 w-100">
          <Button
            title="Otkaži"
            color="fourth"
            onClick={() => setOpen(false)}
          />
          <Button title="Dodaj" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default UsersForm;
