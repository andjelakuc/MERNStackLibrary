import { Col, message, Row } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { GetPostById } from "../../apicalls/posts";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

function PostDescription() {
  const [postData, setPostData] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useSelector((state) => state.users);

  const getPost = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetPostById(id);
      dispatch(HideLoading());
      if (response.success) {
        setPostData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    postData && (
      <div className="h-90 p-2">
        <Row gutter={[16, 16]} align="top" justify="center">
          <Col
            // xs={24}
            // sm={24}
            // md={12}
            // lg={12}
            xl={12}
            className="flex flex-col gap-2"
          >
            <div className="flex justify-center">
              <img src={postData.image} alt="" height={500} width={600} />
            </div>
          </Col>
          <Col
            xs={24}
            sm={24}
            md={12}
            lg={12}
            xl={8}
            className="flex flex-col gap-2 bg-primary p-1 rounded"
          >
            <h1 className="text-3xl text-black font-bold mt-1 p-1">
              {postData?.title}
            </h1>
            <hr />

            <div className="flex justify-between text-black p-1">
              <h1 className="text-md">Datum održavanja</h1>
              <h1 className="text-md">
                {moment(postData?.eventDate).format("DD-MM-YYYY")}
              </h1>
            </div>

            <p className="p-1 text-black">{postData?.description}</p>
          </Col>
        </Row>
      </div>
    )
  );
}

export default PostDescription;
