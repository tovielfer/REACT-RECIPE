import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { SetUser } from "../service/user"
import { useLocation } from 'react-router-dom';
const schema = yup.object({
    userName: yup.string().required("זהו שדה חובה"),
    password: yup.string().required("יש להכניס סיסמא"),
}).required()

const Login = () => {
const { state } = useLocation()
const navigate=useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
        // , defaultValues: { userName: state?.Username, password: state?.Password }
    });
    const onSubmit = data => {
        dispatch(SetUser(data,navigate))

    }

    return (
        <>
        <br/>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
                <input {...register("userName")} placeholder="שם משתמש" />
                <p style={{ color: "red" }}>{errors.userName?.message}</p>

                <input type="password"{...register("password")} placeholder="סיסמא" />
                <p style={{ color: "red" }}>{errors.password?.message}</p>

                <Input type='submit' color="teal" />
            </Form>
            <br></br>
            <Link to='/signup' >
                <Button animated>
                    <Button.Content visible>אין לך חשבון?</Button.Content>
                    <Button.Content hidden>
                        הרשם<Icon name='arrow left' />
                    </Button.Content>
                </Button>
            </Link>
        </>
    );
}

export default Login