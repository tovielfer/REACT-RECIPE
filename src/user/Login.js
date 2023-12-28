import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, Icon, Form, Input } from 'semantic-ui-react'
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from 'yup'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const schema = yup.object({
    userName: yup.string().required("זהו שדה חובה"),
    password: yup.string().required("יש להכניס סיסמא"),
}).required()

const Login = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state?.user);
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const navigate = useNavigate()
    const onSubmit = data => {
        axios.post('http://localhost:8080/api/user/login', { Username: data.userName, Password: data.password })
            .then(x => {
                dispatch({ type: "SET_USER", payload: x.data })
                navigate(`/home`)

            }).catch(err => {
                alert("אחד הפרטים שהוזנו שגוי");
                navigate('/')
            })
    };
    // const { fielsd, append, prepend, remove, swap, move, insert } = useFieldArray({
    //     control, 
    //     name: "login",
    // });

    return (
        /* // <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
         //     <Form.Input  {...register("userName")}
         //         icon='user'
         //         iconPosition='left'
         //         label='Username'
         //         placeholder='Username'
         //         name="userName"
         //     />
         //     <div>{errors.username?.message}</div>
 
         //     <Form.Input  {...register("password")}
         //         icon='lock'
         //         iconPosition='left'
         //         label='Password'
         //         type='password'
         //         name="password"
         //     />
         //     <p>{errors.password?.message}</p>
         //     <Button color="teal" content='Login' primary />
         // </Form>*/
        <>
            <Form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px', margin: 'auto' }}>
                <input {...register("userName")} placeholder="שם משתמש" />
                <p>{errors.userName?.message}</p>

                <input {...register("password")} placeholder="סיסמא" />
                <p>{errors.password?.message}</p>

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