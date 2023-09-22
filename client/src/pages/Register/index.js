import React from 'react'
import { Form } from 'antd'
import Button from '../../components/Button'
import { Link } from 'react-router-dom';

function Register() {

    const onFinish = async (values) => {
        console.log("Success:", values)
      };


  return (
    <div className='h-screen bg-primary flex items-center justify-center'>
        
        <div className='authentication-form bg-third p-3 rounded'>
        <h1 className="text-black text-2xl font-bold mb-1">
          BIBLIOTEKA - REGISTRACIJA
        </h1>
        <hr />
            <Form layout='vertical' onFinish={onFinish}>

           <Form.Item
           label="Ime"
           name="name">
           <input type="text" placeholder="Ime" />
           </Form.Item>

           <Form.Item
           label="Email"
           name="email">
           <input type="email" placeholder="Email" />
           </Form.Item>

           <Form.Item
           label="Šifra"
           name="password">
           <input type="password" placeholder="Šifra" />
           </Form.Item>


           <div className="text-center mt-2 flex flex-col gap-1">
           <Button title="Registracija" type='submit' color='fourth'/>
           <Link to="/login" className="text-black text-sm">
              Već imate nalog? Prijavite se!
            </Link>
            </div>

            </Form>
        </div>
    </div>
  )
}

export default Register