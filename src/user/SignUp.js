import React from 'react'
import { Form, Icon, Input, Message } from 'semantic-ui-react'
import * as yup from 'yup'
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { AddUser } from "../service/user"
import { useLocation } from 'react-router-dom';


const schema = yup.object({
    Username: yup.string().required("זהו שדה חובה"),
    Password: yup.string().required("זהו שדה חובה"),
    Name: yup.string().required("זהו שדה חובה"),
    Phone: yup.string().matches(/^[0-9]{7,10}$/, 'על מספר טלפון לכלול בין 7 ל-10 ספרות').required("זהו שדה חובה"),
    Email: yup.string().email("כתובת מייל אינה תקינה").required("זהו שדה חובה"),
    Tz: yup.string().matches(/^[0-9]{9}$/, 'תעודת זהות חייבת להיות מ- 9 ספרות בדיוק נמרץ!').required("זהו שדה חובה"),
}).required()

const SignUp = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: { Username: state?.userName }
    });
    const onSubmit = data => {
        dispatch(AddUser(data, navigate))
    }
    return (
        <div style={{ width: '60%', position: "absolute", left: "20%", backgroundColor: "#008080b3", padding: "10px" }}>
            <Message
                attached
                header='ברוכים הבאים לאתר מתכונים'
                content='אנא הכנס פרטים מדויקים!'
            />
            <Form onSubmit={handleSubmit(onSubmit)}>
                <br></br>
                <input {...register("Username")} placeholder="שם משתמש" />
                <p style={{ color: "red" }}>{errors.Username?.message}</p>

                <input type='password'{...register("Password")} placeholder="סיסמא" />
                <p style={{ color: "red" }}>{errors.Password?.message}</p>

                <input {...register("Name")} placeholder="שם ומשפחה" />
                <p style={{ color: "red" }}>{errors.Name?.message}</p>

                <input {...register("Phone")} placeholder="פלא'" />
                <p style={{ color: "red" }}>{errors.Phone?.message}</p>

                <input {...register("Email")} placeholder="כתובת דואר אלקטרוני" />
                <p style={{ color: "red" }}>{errors.Email?.message}</p>

                <input {...register("Tz")} placeholder="מספר זהות" />
                <p style={{ color: "red" }}>{errors.Tz?.message}</p>
                <Input type="submit" />
            </Form>
            <br></br>
            <Message attached='bottom' warning>
                <Icon name='help' />
                יש לך חשבון?&nbsp;<Link to="/login">הכנס כאן</Link>&nbsp;במקום.
            </Message>
        </div >

    )
}

export default SignUp