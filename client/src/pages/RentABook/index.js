import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Col, message, Row, Badge } from "antd";
import { GetLast } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function RentABook() {
  const [books, setBooks] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getBooks = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLast();
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

  useEffect(() => {
    getBooks();
  }, []);
  return (
    <div className="bg-primary">
      <section className="Services topMarign">
        <div className="container">
          <div className="heading">
            <h1>IZNAJMITE KNJIGU</h1>
          </div>

          <div className="contain topMarign">
            <Row gutter={[16, 16]}>
              {books.map((book) => {
                return (
                  <Col
                    xs={24}
                    sm={24}
                    md={12}
                    lg={6}
                    xl={6}
                    key={book._id}
                    onClick={() => navigate(`/book/${book._id}`)}
                  >
                    <Badge.Ribbon
                      text={
                        book.availableCopies > 0 ? "Dostupna" : "Nedostupna"
                      }
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
          <div
            className="topMarign text-black"
            onClick={() => navigate("/allBooks")}
          >
            <i>Pogledajte sve knjige &#10230;</i>
          </div>
        </div>
      </section>
    </div>
  );
}

export default RentABook;
