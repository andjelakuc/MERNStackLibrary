import { Col, message, Row } from "antd";
import React from "react"
import { GetAllPosts } from "../../apicalls/posts";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

function BlogsPage() {
    const [posts, setPosts] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  return (
    <div className="p-2">
      <section className='blog Services bg-third'>
        
            <Row gutter={[30, 30]}>
            {posts.map((post) => {
              return (
                <Col xs={24} sm={24} md={12} lg={6} xl={6}
                  key={post._id}
                  onClick={() => navigate(`/post/${post._id}`)}
                >
                
                <div className='box'>
                  <div className='img'>
                    <img src={post.image} height="350px" onClick={() => navigate(`/post/${post._id}`)} />
                  </div>
                  <div className='text'>
                    <span>{moment(post.createdAt).format("DD-MM-YYYY")}</span>
                    <h2>{post.title}</h2>
                    <p>{moment(post.eventDate).format("DD-MM-YYYY")}</p>
                    <a onClick={() => navigate(`/post/${post._id}`)}>
                      Saznaj više &#10230;
                    </a>
                  </div>
                </div>
                </Col>
              )
            })}
            </Row>

          
      </section>
    </div>
  )
}

export default BlogsPage