import { message, Table } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { DeletePost, GetAllPosts } from "../../../apicalls/posts";
import Button from "../../../components/Button";
import { HideLoading, ShowLoading } from "../../../redux/loadersSlice";
import PostForm from "./PostForm";
import moment from "moment";

function Posts() {
  const [formType, setFormType] = useState("add");
  const [selectedPost, setSelectedPost] = useState(null);
  const [openPostForm, setOpenPostForm] = React.useState(false);
  const [posts, setPosts] = React.useState([]);
  const dispatch = useDispatch();

  const getPosts = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetAllPosts();
      dispatch(HideLoading());
      if (response.success) {
        setPosts(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const deletePost = async (id) => {
    try {
      dispatch(ShowLoading());
      const response = await DeletePost(id);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        getPosts();
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
      title: "Blog",
      dataIndex: "image",
      render: (image) => <img src={image} alt="post" width="60" height="60" />,
    },
    {
      title: "Naslov",
      dataIndex: "title",
    },
    {
      title: "Datum održavanja",
      dataIndex: "eventDate",
      render: (date) => moment(date).format("DD-MM-YYYY"),
    },
    {
      title: "",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-3">
          <i
            className="ri-file-edit-line"
            onClick={() => {
              setFormType("edit");
              setSelectedPost(record);
              setOpenPostForm(true);
            }}
          ></i>
          <i
            class="ri-delete-bin-2-line"
            onClick={() => deletePost(record._id)}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end">
        <Button
          title="Dodaj blog"
          color="fourth"
          onClick={() => {
            setFormType("add");
            setSelectedPost(null);
            setOpenPostForm(true);
          }}
        />
      </div>

      <Table columns={columns} dataSource={posts} className="mt-1" />

      {openPostForm && (
        <PostForm
          open={openPostForm}
          setOpen={setOpenPostForm}
          reloadPosts={getPosts}
          formType={formType}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
    </div>
  );
}

export default Posts;
