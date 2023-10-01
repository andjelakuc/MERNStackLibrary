import { Col, message, Row } from "antd";
import React from "react"
import { GetLastFour } from "../../apicalls/posts";
import { useNavigate } from "react-router-dom";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import moment from "moment";

function Blog() {
    const [posts, setPosts] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getPosts = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLastFour();
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
    <>
      <section className='blog Services bg-primary'>
        <div className='container'>
          <div className='heading text-black'>
            {/* <h3>prijavite se za</h3> */}
            <h1>AKTIVNOSTI</h1>
          </div>

          <div className='contain topMarign'>
            <Row gutter={[16, 16]}>
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

          </div>
          <div className="topMarign text-black"><i>Pogledajte sve aktivnosti &#10230;</i> </div>
        </div>
      </section>
    </>
  )
}

export default Blog