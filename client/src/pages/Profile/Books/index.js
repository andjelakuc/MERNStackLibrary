import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import BookForm from "./BookForm";
import { Table, message } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { DeleteBook, GetAllBooks } from "../../../apicalls/books";

function Books() {
  const [formType, setFormType] = useState("add");
  const [selectedBook, setSelectedBook] = useState(null);
  const [openBookForm, setOpenBookForm] = React.useState(false);
  const [books, setBooks] = React.useState([]);
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

  useEffect(() => {
    getBooks();
  }, []);

  const deleteBook = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeleteBook(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getBooks();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Knjiga",
      dataIndex: "image",
      render: (image) => <img src={image} alt="book" width="60" height="60" />,
    },
    {
      title: "Naslov",
      dataIndex: "title",
    },
    {
      title: "Žanr",
      dataIndex: "category",
    },
    {
      title: "Jezik",
      dataIndex: "language",
    },
    {
      title: "Autor",
      dataIndex: "author",
    },
    {
      title: "Izdavač",
      dataIndex: "publisher",
    },
    {
      title: "Ukupno kopija",
      dataIndex: "totalCopies",
    },
    {
      title: "Dostupno kopija",
      dataIndex: "availableCopies",
    },
    {
      title: "Godina izdanja",
      dataIndex: "publishedYear",
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-1">
          <i className="ri-delete-bin-5-line"
          onClick={() => deleteBook(record._id)}></i>
          <i
            className="ri-pencil-line"
            onClick={() => {
              setFormType("edit");
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Dodaj knjigu"
          color="fourth"
          onClick={() => {setFormType("add");
          setSelectedBook(null);
          setOpenBookForm(true);}}
        />
      </div>

      <Table columns={columns} dataSource={books} className="mt-1" />

      {openBookForm && (
        <BookForm
          open={openBookForm}
          setOpen={setOpenBookForm}
          reloadBooks={getBooks}
          formType={formType}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
        />
      )}
    </div>
  );
}

export default Books;
