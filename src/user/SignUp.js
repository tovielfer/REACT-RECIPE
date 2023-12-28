import React from 'react'
import { Button, Form, Icon, Input, Message } from 'semantic-ui-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const schema = yup.object({
    Username: yup.string().required("זהו שדה חובה"),
    Password: yup.string().required("זהו שדה חובה"),
    Name: yup.string().required("זהו שדה חובה"),
    Phone: yup.string().matches(/^[0-9]{7,10}$/, 'טלפון חייב להכיל בין 7 ל-10 ספרות').required("זהו שדה חובה"),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("זהו שדה חובה"),
    Tz: yup.string().matches(/^[0-9]{9}$/, 'תעודת זהות חייבת להכיל 9 ספרות בלבד').required("זהו שדה חובה"),
}).required()

const SignUp = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate();

    const onSubmit = data => {
        console.log("data: ", data)
    axios.post("http://localhost:8080/api/user/sighin", { Username: data.Username, Password: data.Password, Name: data.Name, Phone: data.Phone, Email: data.Email, Tz: data.Tz })
        .then(x => {
                dispatch({ type: "SET_USER", payload: x.data });
                console.log("x");
                console.log(x.data);
                navigate(`/home`);
            }).catch(err => {
                console.log(err);
                alert("אחד הפרטים שהוזנו שגוי");
                navigate('/');
            })
        console.log("15985455");
        console.log(user);
    }
    return (
        <div style={{ width: '60%', position: "absolute", left: "20%" }}>
            <Message
                attached
                header='ברוכים הבאים לאתר מתכונים'
                content='אנא הכנס פרטים מדויקים!'
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("Username")} placeholder="userName" />
                <p>{errors.Username?.message}</p>

                <input {...register("Password")} placeholder="password" />
                <p>{errors.Password?.message}</p>

                <input {...register("Name")} placeholder="name" />
                <p>{errors.Name?.message}</p>

                <input {...register("Phone")} placeholder="phone" />
                <p>{errors.Phone?.message}</p>

                <input {...register("Email")} placeholder="email" />
                <p>{errors.Email?.message}</p>

                <input {...register("Tz")} placeholder="identity" />
                <p>{errors.Tz?.message}</p>

                <Input type="submit" />
            </Form>

            {/* <Form className='attached fluid segment'>
                    <Form.Group widths='equal'>
                        <Form.Input
                            fluid
                            label='First Name'
                            placeholder='First Name'
                            type='text'
                        />
                        <Form.Input
                            fluid
                            label='Last Name'
                            placeholder='Last Name'
                            type='text'
                        />
                    </Form.Group>
                    <Form.Input label='Username' placeholder='Username' type='text' />
                    <Form.Input label='Password' type='password' />
                    <Form.Checkbox inline label='I agree to the terms and conditions' />
                    <Button color='blue'>Submit</Button>
                </Form> */}
            <Message attached='bottom' warning>
                <Icon name='help' />
                Already signed up?&nbsp;<a href='#'>Login here</a>&nbsp;instead.
            </Message>
        </div >

    )
}

export default SignUp