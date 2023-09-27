import React, { useEffect, useState } from "react";
import Button from "../../../components/Button";
import BookForm from "./BookForm";
import { Table, message } from "antd";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { DeleteBook, GetAllBooks } from "../../../apicalls/books";
import Issues from "./Issues";
import IssueForm from "./IssueForm";

function Books() {
  const [formType, setFormType] = useState("add");
  const [selectedBook, setSelectedBook] = useState(null);
  const [openBookForm, setOpenBookForm] = React.useState(false);
  const [openIssues, setOpenIssues] = React.useState(false);
  const [openIssuesForm, setOpenIssuesForm] = React.useState(false);
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
        <div className="flex gap-1 items-center">
          <i
            className="ri-file-edit-line"
            onClick={() => {
              setFormType("edit");
              setSelectedBook(record);
              setOpenBookForm(true);
            }}
          ></i>

          <span
            className="flex items-center gap-1 bg-secondary p-1 rounded cursor-pointer outerline"
            onClick={() => {
              setOpenIssues(true);
              setSelectedBook(record);
            }}
          >
            Sve pozajmice
          </span>

          <span
            className="flex items-center gap-1 bg-secondary p-1 rounded cursor-pointer outerline"
            onClick={() => {
              setOpenIssuesForm(true);
              setSelectedBook(record);
            }}
          >
            Pozajmi knjigu
          </span>
          <i
            className="ri-delete-back-2-line"
            onClick={() => deleteBook(record._id)}
          ></i>
        </div>
      ),
    },
  ];
  return (
    <div className="h-screen">
      <div className="flex justify-end">
        <Button
          title="Dodaj knjigu"
          color="fourth"
          onClick={() => {
            setFormType("add");
            setSelectedBook(null);
            setOpenBookForm(true);
          }}
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

      {openIssues && (
        <Issues
          open={openIssues}
          setOpen={setOpenIssues}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          reloadBooks={getBooks}
        />
      )}

      {openIssuesForm && (
        <IssueForm
          open={openIssuesForm}
          setOpen={setOpenIssuesForm}
          selectedBook={selectedBook}
          setSelectedBook={setSelectedBook}
          getData={getBooks}
        />
      )}
    </div>
  );
}

export default Books;
