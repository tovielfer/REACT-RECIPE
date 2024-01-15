import Header from './Header';
import { List, Button, ListContent, ListHeader, ListItem, ListIcon, Icon } from 'semantic-ui-react'
import axios from 'axios';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';


const Buy = () => {
    const [shoppingList, setShoppingList] = useState([]);
    const userId = localStorage.getItem("userId");

    useEffect(function () {
        axios.get(`http://localhost:8080/api/bay/${userId}`).then(response => {
            console.log(response.data);
            setShoppingList(response.data);
            // dispatch({ type: "GET_RECIPES", payload: x.data })
        }).catch(err => {
            Swal.fire({
                icon: "error",
                title: "אופסס....",
                text: err.response.data
            });
        }, []);
    })

    const updateCount = (product, count) => {
        if (product.Count + count == 0) {
            Swal.fire({
                title: "למחוק סופית?",
                text: product.Name + " יוסר מהרשימה שלך",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                cancelButtonText: "ביטול",
                confirmButtonText: "כן, אני רוצה למחוק!"
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.post(`http://localhost:8080/api/bay/delete/${product.Id}`).then((res) => {
                        console.log("res", res);
                        Swal.fire({
                            title: "נמחק!",
                            text: product.Name + " הוסר מרשימת הקניות שלך",
                            icon: "success",
                            showConfirmButton: false,
                            timer: 2000
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
                console.log(res, "res");
            }).catch((err) => {
                console.log(err, "err");
            })
        }
    }

    return (
        <div>
            <Header page={'רשימת קניות'} />
            <List selection verticalAlign='middle' divided style={{ width: "40%", margin: "auto" }}>
                {shoppingList.map(item => (
                    <ListItem key={item.Id}>
                        <ListIcon><Button onClick={() => updateCount(item, -1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='minus circle' /></Button></ListIcon>
                        <ListIcon><Button onClick={() => updateCount(item, 1)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='plus circle' /></Button></ListIcon>
                        <ListContent >
                            <h2>{item.Count} {item.Name}</h2>
                        </ListContent>
                        <ListIcon><Button onClick={() => updateCount(item, -item.Count)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><Icon size='big' name='trash alternate' /></Button></ListIcon>
                    </ListItem>
                ))}
            </List>
        </div>
    )
}


export default Buy;