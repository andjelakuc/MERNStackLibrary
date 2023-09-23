import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetLoggedInUserDetails } from '../apicalls/users';
import { SetUser } from '../redux/usersSlice';
import { useNavigate } from 'react-router-dom';
import { ShowLoading, HideLoading } from '../redux/loadersSlice';

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
                navigate("/login");
                message.error(response.message);
            }
        } catch (error) {
            localStorage.removeItem("token");
            navigate("/login");
            dispatch(HideLoading());
            message.error(error.message);
        }
    };


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        } else {
            validateUserToken();
        }
    }, []);
  return (
    <div>{user && children}</div>
  )
}

export default ProtectedRoute