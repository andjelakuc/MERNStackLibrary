import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import { Col, message, Row, Badge, Form } from "antd";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllBooks } from "../../apicalls/books";

function BooksPage() {
  const [books, setBooks] = React.useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllBooks();
      dispatch(HideLoading());
      if (response.success) {
        setBooks(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onFinish = async (values) => {
    try {
        console.log(values);
        dispatch(ShowLoading());
        const response = await GetAllBooks(values);
        dispatch(HideLoading());
        if (response.success) {
            //getBooks();
          } else {
            message.error(response.message);
          }
    } catch (error) {
        dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <div className="mt-2 bg-third">
      <div className="flex gap-1">
        {/* <input type="text" placeholder="Naslov"></input>
        <input type="text" placeholder="Autor"></input>
        <div className="flex justify-end"><Button title="Pretraži" color="fourth" /></div> */}
        <Form className="ml-2" onFinish={onFinish}>
          <Row gutter={[20]} className="gap-1">
            <Form.Item name="title">
              <input type="text" placeholder="Naslov" />
            </Form.Item>
            <Form.Item name="author">
              <input type="text" placeholder="Autor" />
            </Form.Item>
            <Form.Item name="publishedYear">
              <input type="number" placeholder="Godina izdanja" />
            </Form.Item>
            <Form.Item name="category">
              <select>
                <option value="">Žanr</option>
                <option value="nauka">nauka</option>
                <option value="klasici">klasici</option>
                <option value="drama">drama</option>
                <option value="nefikcija">nefikcija</option>
                <option value="fantastika">fantastika</option>
                <option value="naučna fantastika">naučna fantastika</option>
                <option value="knjige za decu">knjige za decu</option>
                <option value="trileri">trileri</option>
                <option value="akcije">akcije</option>
              </select>
            </Form.Item>
            <Form.Item name="language">
              <select>
                <option value="">Jezik</option>
                <option value="Srpski">Srpski</option>
                <option value="Engleski">Engleski</option>
                <option value="Francuski">Francuski</option>
              </select>
            </Form.Item>
            <div className="flex justify-end">
              <Button title="Pretraži" color="fourth" type="submit" />
            </div>
          </Row>
        </Form>
      </div>
      <div className="p-2">
        <Row gutter={[16, 16]}>
          {books.map((book) => {
            return (
              <Col
                xs={16}
                sm={16}
                md={8}
                lg={4}
                xl={4}
                key={book._id}
                onClick={() => navigate(`/book/${book._id}`)}
              >
                <Badge.Ribbon
                  text={book.availableCopies > 0 ? "Dostupna" : "Nedostupna"}
                  color={book.availableCopies > 0 ? "#7db954" : "red"}
                >
                  <div className="rounded bg-white p-2 shadow flex flex-col gap-1 cursor-pointer">
                    <img src={book.image} height="350px" />
                    <h1 className="text-md text-black font-bold mt-2">
                      {book.title}
                    </h1>
                  </div>
                </Badge.Ribbon>
              </Col>
            );
          })}
        </Row>
      </div>
    </div>
  );
}

export default BooksPage;
