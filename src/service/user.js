import axios from "axios";
import * as Actions from "../Store/action"
import Swal from "sweetalert2";




export const SetUser = (data,navigate) => {
    return dispatch => {
        axios.post('http://localhost:8080/api/user/login', { Username: data.userName, Password: data.password })
            .then((d) => {
                dispatch({ type: Actions.SET_USER, user: d.data })
                localStorage.setItem("userName", d.data.Name);
                localStorage.setItem("userId", d.data.Id);
                navigate(`/home`);
            }).catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "אופססס...",
                    text: err.response.data
                });
                navigate('/');
            })
    }
}

export const AddUser = (data,navigate) => {
    return dispatch => {
        axios.post("http://localhost:8080/api/user/sighin", data)
            .then((d) => {
                dispatch({ type: Actions.SET_USER, user: d.data })
                localStorage.setItem("userName", d.data.Name);
                localStorage.setItem("userId", d.data.Id);
                navigate(`/home`);
            }).catch((err) => {
                Swal.fire({
                    icon: "error",
                    title: "אופססס...",
                    text: err.response.data
                });
                navigate('/');
            })
    }
}
