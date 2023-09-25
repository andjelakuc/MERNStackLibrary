import { Col, Form, message, Modal, Row } from "antd";
import React from "react";
import Button from "../../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AddBook, UpdateBook } from "../../../apicalls/books";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";

function BookForm({
  open,
  setOpen,
  reloadBooks,
  setFormType,
  formType,
  selectedBook,
  setSelectedBook,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      values.createdBy = user._id;
      let response = null;
      if (formType === "add") {
        values.availableCopies = values.totalCopies;
        response = await AddBook(values);
      } else {
        values._id = selectedBook._id;
        response = await UpdateBook(values);
      }

      if (response.success) {
        message.success(response.message);
        reloadBooks();
        setOpen(false);
      } else {
        message.error(response.message);
      }
      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Dodavanje knjige" : "Izmenjivanje knjige"}
      open={open}
      onCancel={() => setOpen(false)}
      centered
      width={800}
      footer={null}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedBook}
      >
        <Row gutter={[20]}>
          <Col span={24}>
            <Form.Item
              label="Naslov"
              name="title"
              rules={[{ required: true, message: "Unesite naslov" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="Opis"
              name="description"
              rules={[
                { required: true, message: "Unesite opis" },
              ]}
            >
              <textarea type="text" />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              label="URL slike"
              name="image"
              rules={[{ required: true, message: "Unesite url slike" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Autor"
              name="author"
              rules={[{ required: true, message: "Unesite ime autora" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              label="Izdavač"
              name="publisher"
              rules={[
                { required: true, message: "Unesite izdavača" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Godina izdanja"
              name="publishedYear"
              rules={[
                { required: true, message: "Unesite godinu izdanja" },
              ]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Žanr"
              name="category"
              rules={[{ required: true, message: "Unesite žanr" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Jezik"
              name="language"
              rules={[{ required: true, message: "Unesite jezik" }]}
            >
              <select>
              <option value="">Izaberite jezik</option>
              <option value="Srpski">Srpski</option>
              <option value="Engleski">Engleski</option>
              <option value="Francuski">Francuski</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Cena po danu"
              name="rentPerDay"
              rules={[{ required: true, message: "Unesite cenu" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              label="Ukupno kopija"
              name="totalCopies"
              rules={[{ required: true, message: "Unesite broj kopija" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
        </Row>

        <div className="flex justify-end gap-2 mt-1">
          <Button
            type="button"
            
            color="fourth"
            title="Otkaži"
            onClick={() => setOpen(false)}
          />
          <Button title="Sačuvaj" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default BookForm;