import React, { useEffect } from "react";
import { Form, message } from "antd";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { RegisterUser } from "../../apicalls/users";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await RegisterUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <div>
      <div className="h-screen bg-primary flex items-center justify-center">
        <div className="authentication-form bg-third p-3 rounded">
          <h1 className="text-black text-2xl font-bold mb-1">REGISTRUJTE SE</h1>
          <hr />
          <Form layout="vertical" onFinish={onFinish} className="mt-1">
            <Form.Item
              label="Ime"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Unesite ime",
                },
              ]}
            >
              <input type="text" placeholder="Ime" />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Unesite mejl adresu",
                },
              ]}
            >
              <input type="email" placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Broj telefona"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Unesite broj telefona",
                },
              ]}
            >
              <input type="number" placeholder="Broj telefona" />
            </Form.Item>

            <Form.Item
              label="Šifra"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Unesite šifru",
                },
              ]}
            >
              <input type="password" placeholder="Šifra" />
            </Form.Item>

            <div className="text-center mt-2 flex flex-col gap-1">
              <Button title="Registracija" type="submit" color="fourth" />
              <Link to="/login" className="text-black text-sm">
                Već imate nalog? Prijavite se!
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default Register;
