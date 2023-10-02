import { Col, message, Row } from "antd";
import moment from "moment";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetBookById } from "../../apicalls/books";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useNavigate } from "react-router-dom";

function BookDescription() {
  const [bookData, setBookData] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);

  const getBook = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetBookById(id);
      dispatch(HideLoading());
      if (response.success) {
        setBookData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getBook();
  }, []);
  return (
    bookData && (
      <div className="p-2">
        <Row gutter={[8, 8]} align="top" justify="center">
          <Col
            // xs={24}
            // sm={24}
            // md={12}
            // lg={12}
            xl={8}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-center">
              <img src={bookData.image} alt=""  />
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={12}
            className="flex flex-col gap-2 bg-primary p-1 rounded"
          >
            <h1 className="text-3xl text-black font-bold mt-1 p-1">
              {bookData?.title}
            </h1>
            <hr />

            <p className="p-1 text-black">{bookData?.description}</p>

            <hr />
            <div className="flex justify-between text-black p-1">
              <h1 className="text-md">Autor</h1>
              <h1 className="text-md">{bookData?.author}</h1>
            </div>
            <div className="flex justify-between text-black p-1">
              <h1 className="text-md">Žanr</h1>
              <h1 className="text-md">{bookData?.category}</h1>
            </div>
            <div className="flex justify-between text-black p-1">
              <h1 className="text-md">Izdavač</h1>
              <h1 className="text-md">{bookData?.publisher}</h1>
            </div>
            <div className="flex justify-between text-black p-1">
              <h1 className="text-md">Godina izdanja</h1>
              <h1 className="text-md">
                {moment(bookData?.publishedDate).format("YYYY")}
              </h1>
            </div>
            <div className="flex justify-between text-black p-1">
              <h1 className="text-md">Dostupno kopija</h1>
              <h1 className="text-md">{bookData?.availableCopies}</h1>
            </div>
          </Col>
        </Row>
      </div>
    )
  );
}

export default BookDescription;
