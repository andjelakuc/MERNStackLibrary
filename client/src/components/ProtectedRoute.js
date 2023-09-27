import React, { useEffect } from "react";
import { message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetLoggedInUserDetails } from "../apicalls/users";
import { SetUser } from "../redux/usersSlice";
import { useNavigate } from "react-router-dom";
import { ShowLoading, HideLoading } from "../redux/loadersSlice";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const validateUserToken = async () => {
    try {
      dispatch(ShowLoading());
      const response = await GetLoggedInUserDetails();
      dispatch(HideLoading());
      if (response.success) {
        dispatch(SetUser(response.data));
      } else {
        localStorage.removeItem("token");
        navigate("/");
        message.error(response.message);
      }
    } catch (error) {
      localStorage.removeItem("token");
      navigate("/");
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      validateUserToken();
    }
  }, []);
  return (
    <div>
      {user && (
        <div className="p-1 bg-third">
          <div className="header p-2 bg-primary flex justify-between rounded items-center">
            <h1
              className="text-2xl text-black cursor-pointer bg-white outerline p-1 rounded"
              onClick={() => navigate("/home")}
            >
              BIBLIOTEKA
            </h1>

            <div className="flex items-center gap-1 bg-white p-1 rounded outerline">
              <i
                className="ri-empathize-line"
                onClick={() => navigate("/profile")}
              ></i>
              <span
                className="text-sm cursor-pointer"
                onClick={() => navigate("/profile")}
              >
                {user.name}
              </span>
              <i
                className="ri-logout-circle-r-line"
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/");
                }}
              ></i>
            </div>
          </div>

          <div className="content mt-1">{children}</div>
        </div>
      )}
    </div>
  );
}

export default ProtectedRoute;
