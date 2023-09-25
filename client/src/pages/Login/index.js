import React, {useEffect} from 'react'
import { Form, message } from 'antd'
import Button from '../../components/Button'
import { Link, useNavigate } from 'react-router-dom';
import { LoginUser } from '../../apicalls/users';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loadersSlice';

function Login() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await LoginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        window.location.href = "/home";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    }
  }, []);


  return (
    <div>
      <div className="p-1 bg-primary">
      <div className="header p-2 bg-third flex justify-between rounded items-center">
        <h1
          className="text-2xl text-black font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          BIBLIOTEKA
        </h1>

        <div className="flex items-center gap-1 bg-white p-1 rounded">
          <i className="ri-user-heart-line"></i>
          <span
            className="text-sm cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Registrujte se
          </span>
        </div>
      </div>
    </div>
    <div className='h-screen bg-primary flex items-center justify-center'>
        
        <div className='authentication-form bg-third p-3 rounded'>
        <h1 className="text-black text-2xl font-bold mb-1">
          PRIJAVITE SE
        </h1>
        <hr />
            <Form layout='vertical' onFinish={onFinish} className='mt-1'>

           <Form.Item
           label="Email"
           name="email"
           rules={[
            {
            required: true,
            message: "Unesite mejl adresu",
            },
          ]}>
           <input type="email" placeholder="Email" />
           </Form.Item>

           <Form.Item
           label="Šifra"
           name="password"
           rules={[
            {
            required: true,
            message: "Unesite šifru",
            },
          ]}>
           <input type="password" placeholder="Šifra" />
           </Form.Item>


           <div className="text-center mt-2 flex flex-col gap-1">
           <Button title="Prijava" type='submit' color='fourth'/>
           <Link to="/register" className="text-black text-sm">
              Još uvek nemate nalog? Registrujte se!
            </Link>
            </div>

            </Form>
        </div>
    </div>
    </div>
  )
}

export default Login