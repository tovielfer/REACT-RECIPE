import axios from "axios";
import Swal from "sweetalert2";

export const getShoppingList = (userId) => {
    return dispatch => axios.get(`http://localhost:8080/api/bay/${userId}`).then(res => {
           dispatch({ type: "SET_SHOPPING_LIST", data: res.data });
        
    }) .catch((err) => {
        Swal.fire({
            icon: "error",
            title: "אופססס...",
            text: err.response.data
        })});
}
export const updateCount = (product, count) => {
    return dispatch => {
        if (product.Count + count == 0) {
            Swal.fire({
                title: "להסיר "+product.Name+" מרשימת הקניות שלך?",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "ביטול",
                confirmButtonText: "כן, אני רוצה למחוק!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`).then((res) => {
                        dispatch({ type: "DELETE_BUY", data: { Name: product.Name, user: product.UserId, Id: product.Id } })
                        console.log("res", res);
                        Swal.fire({
                            title: "נמחק!",
                            text: product.Name + " הוסר מרשימת הקניות שלך",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 500
                        });
                    }).catch((err) => {
                        Swal.fire({
                            icon: "error",
                            title: "אופסססס...",
                            text: err.response.data,
                            confirmButtonText: "😭😭😭"
                        });
                    });
                }
            });
        }
        else {
            axios.post(`http://localhost:8080/api/bay/`, { Name: product.Name, UserId: product.UserId, Count: count }).then(res => {
                dispatch({ type: "EDIT_BUY", data: { Name: product.Name, UserId: product.UserId, Count: res.data.Count
                } })
                console.log(res, "reskkkkkk");
            }).catch((err) => {
                console.log(err, "err");
            })
        }
    }
}
export const addFromRecipe = (x,userId) => {
    return dispatch => {
            axios.post(`http://localhost:8080/api/bay`, { Name: x.Name, UserId: userId, Count: 1 })
            .then((res) => {
                dispatch({ type: "EDIT_BUY", data: { Name: x.Name, UserId: userId, Count: res.data.Count } })
                Swal.fire({
                    position: "top",
                    icon: "success",
                    title: x.Name + "\n" + "נוסף בהצלחה לרשימת הקניות שלך",
                    showConfirmButton: false,
                    timer: 1000
                });}) .catch(err => {
                    Swal.fire({
                        icon: "error",
                        title: "אופססס...",
                        text: err.response.data
                    })})
        }
    }


